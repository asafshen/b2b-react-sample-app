import DescopeClient from "@descope/node-sdk";
import * as dotenv from "dotenv";

dotenv.config();

export default async function handler(request, response) {
  const projectId = request.headers['x-project-id'] || process.env.REACT_APP_DESCOPE_PROJECT_ID;
  console.log('transfer api starts...', {
    projectId
  })
  // when using cookies
  // const cookies = request.cookies;
  // const session_token = cookies.DS; // extract from request. The value is stored typically in DS cookie.
  
  // when using authorization header
  const header = request.headers['authorization'];
  const sessionToken = header?.split(" ")[1] ?? "";

  const descopeClient = DescopeClient({
    projectId: projectId,
    baseUrl: process.env.DESCOPE_BASE_URL
  });
  
  try {
    const jwt = await descopeClient.validateSession(sessionToken);
    Object.keys(jwt.token.tenants || []).forEach((tenantId) => {
      roles = roles.concat(jwt.token.tenants[tenantId].roles);
    });

    const stepUpConfirmed = (jwt.token.su === true)
    
    if (!stepUpConfirmed) {
      throw "401 Unauthorized User - Step-up required";
    }

    response.status(200).json({
      body: { message: "Transfer successful" },
    });
  } catch (error) {
    console.log('transfer api error:', error)
    response.status(401).json({
      body: {},
      query: request.query,
      cookies: request.cookies,
    });
  }
  response.send();
}

