import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource.js";
import { data } from "./data/resource.js";
import { storage } from "./storage/resource.js";

const backend = defineBackend({
  auth,
  data,
  storage,
});

// ✅ Access `cfnUserPool` inside `backend.auth`
const { cfnUserPool } = backend.auth.resources.cfnResources;

// ✅ Ensure email/phone are NOT used as usernames
cfnUserPool.usernameAttributes = [];

export default backend;
