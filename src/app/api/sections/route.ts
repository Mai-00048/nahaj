// // api/sections.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { ContentService } from '../../lib/contentService';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     switch (req.method) {
//       case 'GET': {
 //         const { data, error } = await ContentService.getAllSections();
//         if (error) return res.status(400).json({ error });
//         return res.status(200).json(data);
//       }

//       case 'POST': {
 //         const { title, description, image_url } = req.body;
//         const { data, error } = await ContentService.createSection({ title, description, image_url });
//         if (error) return res.status(400).json({ error });
//         return res.status(201).json(data);
//       }

//       case 'PUT': {
 //         const { id, title, description, image_url } = req.body;
//         if (!id) return res.status(400).json({ error: 'Section ID required' });
//         const { data, error } = await ContentService.updateSection(id, { title, description, image_url });
//         if (error) return res.status(400).json({ error });
//         return res.status(200).json(data);
//       }

//       case 'DELETE': {
 //         const { id } = req.body;
//         if (!id) return res.status(400).json({ error: 'Section ID required' });
//         const { success, error } = await ContentService.deleteSection(id);
//         if (error || !success) return res.status(400).json({ error: error || 'Delete failed' });
//         return res.status(200).json({ success: true });
//       }

//       default:
//         return res.status(405).json({ error: 'Method not allowed' });
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// }
