export const config = {
  runtime: 'edge',
};

export default {
  async fetch(request, env) {
    const { AUDIO_BUCKET, DB } = env;

    const id = crypto.randomUUID();
    const audioBlob = await request.arrayBuffer();

    const objectKey = `${id}.mp3`;

    // Upload to R2
    await AUDIO_BUCKET.put(objectKey, audioBlob, {
      httpMetadata: { contentType: "audio/mpeg" },
    });

    const url = `https://${env.AUDIO_BUCKET.bucket}.r2.dev/${objectKey}`;

    // Save to D1
    await DB.prepare(
      "INSERT INTO audio_files (id, url) VALUES (?1, ?2)"
    ).bind(id, url).run();

    return new Response(JSON.stringify({ id, url }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
