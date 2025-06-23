// awsApiHelper.js

import { Amplify, Auth } from 'aws-amplify';
import { configureAmplify } from './amplifyClient';
import crypto from 'crypto';

// You must configure Amplify somewhere before using this
// Amplify.configure({
//   Auth: { ... }
// });
await configureAmplify();

export class AwsApiHelper {
  constructor(region = 'us-east-1', debug = false) {
    this.region = region;
    this.debug = debug;
  }

  async get({ url }) {
    const method = 'GET';
    const body = '';

    const { headers, signedUrl } = await this._signRequest({
      url,
      method,
      body,
    });

    const response = await fetch(signedUrl, {
      method,
      headers,
    });

    return response;
  }

  async post({ url, body }) {
    const method = 'POST';
    const bodyJson = JSON.stringify(body);

    const { headers, signedUrl } = await this._signRequest({
      url,
      method,
      body: bodyJson,
    });

    const response = await fetch(signedUrl, {
      method,
      headers,
      body: bodyJson,
    });

    return response;
  }

  async _signRequest({ url, method, body }) {
    const credentials = await this._getAwsCredentials();

    const endpoint = new URL(url);
    const host = endpoint.host;
    const path = endpoint.pathname;
    const query = endpoint.searchParams.toString();

    const now = new Date();
    const amzDate = this._buildAmzDate(now);
    const dateStamp = this._buildDateStamp(now);

    const canonicalUri = path;
    const canonicalQueryString = query;
    const canonicalHeaders = `host:${host}\n` + `x-amz-date:${amzDate}\n`;
    const signedHeaders = 'host;x-amz-date';

    const payloadHash = crypto
      .createHash('sha256')
      .update(body)
      .digest('hex');

    const canonicalRequest = [
      method,
      canonicalUri,
      canonicalQueryString,
      canonicalHeaders,
      signedHeaders,
      payloadHash,
    ].join('\n');

    if (this.debug) {
      console.log('Canonical Request:\n', canonicalRequest);
    }

    const credentialScope = `${dateStamp}/${this.region}/execute-api/aws4_request`;

    const stringToSign = [
      'AWS4-HMAC-SHA256',
      amzDate,
      credentialScope,
      crypto
        .createHash('sha256')
        .update(canonicalRequest)
        .digest('hex'),
    ].join('\n');

    if (this.debug) {
      console.log('String to Sign:\n', stringToSign);
    }

    const signingKey = this._getSignatureKey(
      credentials.secretAccessKey,
      dateStamp,
      this.region,
      'execute-api'
    );

    const signature = crypto
      .createHmac('sha256', signingKey)
      .update(stringToSign)
      .digest('hex');

    const authorizationHeader =
      `AWS4-HMAC-SHA256 Credential=${credentials.accessKeyId}/${credentialScope}, ` +
      `SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const headers = {
      'x-amz-date': amzDate,
      'Authorization': authorizationHeader,
      'x-amz-security-token': credentials.sessionToken || '',
    };

    if (method === 'POST') {
      headers['Content-Type'] = 'application/json';
    }

    if (this.debug) {
      console.log('Signed Headers:', headers);
    }

    return {
      headers,
      signedUrl: url,
    };
  }

  async _getAwsCredentials() {
    const session = await Auth.currentSession();
    const credentials = session.getAccessToken().getJwtToken();

    const { accessKeyId, secretAccessKey, sessionToken } =
      (await Auth.currentCredentials()).get();

    return {
      accessKeyId,
      secretAccessKey,
      sessionToken,
    };
  }

  _buildAmzDate(date) {
    return (
      date
        .toISOString()
        .replace(/[:-]|\.\d{3}/g, '') + 'Z'
    );
  }

  _buildDateStamp(date) {
    return date.toISOString().slice(0, 10).replace(/-/g, '');
  }

  _hmacSha256(key, data) {
    return crypto.createHmac('sha256', key).update(data).digest();
  }

  _getSignatureKey(key, dateStamp, regionName, serviceName) {
    const kDate = this._hmacSha256(`AWS4${key}`, dateStamp);
    const kRegion = this._hmacSha256(kDate, regionName);
    const kService = this._hmacSha256(kRegion, serviceName);
    const kSigning = this._hmacSha256(kService, 'aws4_request');
    return kSigning;
  }
}
