interface EnvConfig {
  BASE_URL: string;

  NEXT_AUTH_SECRET: string;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;

  SENTRY_DSN: string;

  RESEND: {
    API_KEY: string;
    FROM: string;
  };

  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRE_TIME: string;
  REFRESH_TOKEN_SECRET: string;
  TEMP_TOKEN_SECRET: string;
  TEMP_TOKEN_EXPIRE_TIME: string;
}

export const ENV = {
  BASE_URL: process.env.BASE_URL!,

  NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET!,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,

  SENTRY_DSN: process.env.SENTRY_DSN!,

  RESEND: {
    API_KEY: process.env.RESEND_API_KEY!,
    FROM: process.env.RESEND_FROM_EMAIL!,
  },

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
  ACCESS_TOKEN_EXPIRE_TIME: process.env.ACCESS_TOKEN_EXPIRE_TIME!,
  REFRESH_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
  TEMP_TOKEN_SECRET: process.env.TEMP_TOKEN_SECRET!,
  TEMP_TOKEN_EXPIRE_TIME: process.env.TEMP_TOKEN_EXPIRE_TIME!,
} as Readonly<EnvConfig>;

export const isProd = process.env.NODE_ENV === "production";
