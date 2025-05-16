export const generateM3U8 = (mediaSequence: number): string => {
  const segments = [
    {
      duration: -1,
      uri: "https://d1aof1lwumql9k.cloudfront.net/104_STAGING/cd99ef2549fe8aa77a7c8c65485a7d9f615f7cc8ee8d0d944f6d98497633fe2c_240p0.ts",
    },
    {
      duration: -1,
      uri: "https://d1aof1lwumql9k.cloudfront.net/104_STAGING/cd99ef2549fe8aa77a7c8c65485a7d9f615f7cc8ee8d0d944f6d98497633fe2c_240p0.ts",
    },
    {
      duration: -1,
      uri: "https://d1aof1lwumql9k.cloudfront.net/104_STAGING/cd99ef2549fe8aa77a7c8c65485a7d9f615f7cc8ee8d0d944f6d98497633fe2c_240p0.ts",
    },
  ];

  const config = [
    "#EXTM3U",
    "#EXT-X-VERSION:3",
    "#EXT-X-TARGETDURATION:11",
    "#EXT-X-KEY:METHOD=AES-128,URI=https://d1aof1lwumql9k.cloudfront.net/104_STAGING/encryption.key",
    "#EXT-X-DISCONTINUITY",
  ];

  const segmentsM3U8 = segments.map((segment) => {
    return `#EXTINF:1\n${segment.uri}\n`;
  });

  config.push(...segmentsM3U8);

  return config.join("\n");
};
