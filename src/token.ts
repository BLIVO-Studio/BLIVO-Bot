import { token, load_token_from_env } from '../config.json';

function getToken(): string {
  let TOKEN: string | undefined

  if (load_token_from_env) {
    TOKEN = process.env['TOKEN']
  } else {
    TOKEN = token
  }

  if (TOKEN == undefined) {
    throw new Error('Token missing');
  } else {
    return TOKEN
  }
}

export { getToken }
