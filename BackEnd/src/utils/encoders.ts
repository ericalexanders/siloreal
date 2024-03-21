export function base64encode(data: string) {
  const buff = Buffer.from(data, "utf8");
  const base64data = buff.toString("base64");
  return base64data;
}

export function getRefreshAthorization(): string {
  const client_id = process.env.QUICKBOOKS_CLIENT_ID;
  const client_secret = process.env.QUICKBOOKS_CLIENT_SECRET;
  const authorization = "Basic " + base64encode(client_id + ":" + client_secret);
  return authorization;
}
