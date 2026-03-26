import { init } from '@heyputer/puter.js/src/init.cjs';

const puterAuthToken = process.env.PUTER_AUTH_TOKEN;

const Puter = init(puterAuthToken);

export default Puter;