// import { Prisma } from "@prisma/client";
import QuickBooks from "node-quickbooks";
const axios = require('axios');
const qs = require('qs');

export function qbClient(
  access_token: string | null,
  refresh_token: string | null,
  realmId: string,
) {
  const consumer_key = process.env.QUICKBOOKS_CLIENT_ID;
  const consumer_secret = process.env.QUICKBOOKS_CLIENT_SECRET;
  const isProduction = !!(process.env.QUICKBOOKS_ENVIRONMENT == "production")
  const qbo = new QuickBooks(
    consumer_key,
    consumer_secret,
    access_token,
    isProduction, // no token secret for oAuth 2.0
    realmId,
    !isProduction, // use the sandbox?
    true, // enable debugging?
    4, // set minorversion, or null for the latest version
    "2.0", //oAuth version
    refresh_token,
  );
  return qbo;
}

export function refreshQbToken(refreshToken: string): Promise<any> {
  const auth = 'QUJuaWphOEJENVNyb2NsUTROZGZNeTQwOFVYc0FsNlBkZExCZFc0b21ZT3VjMGRhbkM6Q3hJekx0ekFuMDl2akd1cEdHZUZkWkN3N2U3akQxcHpKZzUwb20xbQ==';
  const isProduction = !!(process.env.QUICKBOOKS_ENVIRONMENT == "production")
  const clientId = process.env.QUICKBOOKS_CLIENT_ID;
  const clientSecret = process.env.QUICKBOOKS_CLIENT_SECRET;
  const authdev = Buffer.from(clientId + ':' + clientSecret).toString('base64')
  return axios({
      method: 'post',
      url: 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + isProduction ? auth: authdev,
      },
      data: qs.stringify({
          'grant_type': 'refresh_token',
          'refresh_token': refreshToken,
      }),
  })
}
