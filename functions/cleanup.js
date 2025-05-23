export default {
  async scheduled(event, env, ctx) {
    const threshold = Date.now() - 1000 * 60 * 60 * 24; // 24 hours

    const results = await env.DB.prepare(
      "SELECT * FROM audio_files WHERE created_at < datetime('now', '-1 day')"
    ).all();

    for (const row of results.results) {
      const key = new URL(row.url).pathname.substring(1); // strip leading /
      await env.AUDIO_BUCKET.delete(key);
      await env.DB.prepare("DELETE FROM audio_files WHERE id = ?1").bind(row.id).run();
    }
  },
};
