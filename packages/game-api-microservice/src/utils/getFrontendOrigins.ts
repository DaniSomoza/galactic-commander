const { FRONTEND_ORIGIN } = process.env

function getFrontendOrigins(): string[] {
  if (!FRONTEND_ORIGIN) {
    return []
  }

  return FRONTEND_ORIGIN.split(',').map((origin) => origin.trim())
}

export default getFrontendOrigins
