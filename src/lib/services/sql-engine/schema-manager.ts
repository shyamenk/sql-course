import { neon } from '@neondatabase/serverless';
import { UserSchema } from './types';

function getSqlClient() {
  return neon(process.env.DATABASE_URL!);
}

function generateSchemaName(userId: string): string {
  const sanitized = userId.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20);
  return `user_${sanitized}`;
}

export async function createUserSchema(userId: string): Promise<UserSchema> {
  const sql = getSqlClient();
  const schemaName = generateSchemaName(userId);

  await sql`SELECT set_config('statement_timeout', '10000', false)`;

  const schemaExists = await sql`
    SELECT schema_name 
    FROM information_schema.schemata 
    WHERE schema_name = ${schemaName}
  `;

  if (schemaExists.length === 0) {
    await sql.unsafe(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
  }

  return { schemaName, userId };
}

export async function initializeSchemaWithData(
  schemaName: string,
  setupSql: string
): Promise<void> {
  const sql = getSqlClient();

  await sql.unsafe(`SET search_path TO "${schemaName}", public`);

  const statements = setupSql
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    await sql.unsafe(statement);
  }
}

export async function dropUserSchema(userId: string): Promise<void> {
  const sql = getSqlClient();
  const schemaName = generateSchemaName(userId);

  await sql.unsafe(`DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`);
}

export async function schemaExists(userId: string): Promise<boolean> {
  const sql = getSqlClient();
  const schemaName = generateSchemaName(userId);

  const result = await sql`
    SELECT schema_name 
    FROM information_schema.schemata 
    WHERE schema_name = ${schemaName}
  `;

  return result.length > 0;
}

export function getSchemaName(userId: string): string {
  return generateSchemaName(userId);
}
