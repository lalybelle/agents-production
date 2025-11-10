 import { promises as fs } from 'fs';
 import path from 'path';

 const dbPath = path.resolve(__dirname, 'db.json');

 interface Database {
   messages: any[];
 }

 async function clearMessages(): Promise<void> {
   try {
     const fileContent = await fs.readFile(dbPath, 'utf-8');
     const db: Database = JSON.parse(fileContent);

     db.messages = [];
     await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8');

     console.log('Successfully cleared all messages in db.json');
   } catch (error) {
       console.error('An unknown error occurred:', error);
   }
 }

 clearMessages();
