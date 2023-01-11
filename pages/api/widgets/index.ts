import { NextApiRequest, NextApiResponse } from 'next';
import { bigcommerceClient, getSession } from '../../../lib/auth';

export default async function products(req: NextApiRequest, res: NextApiResponse) {
    const {
        body,
        query: { pid },
        method,
    } = req;

    switch (method) {
        case 'GET':
            try {
                const { accessToken, storeHash } = await getSession(req);
                const bigcommerce = bigcommerceClient(accessToken, storeHash);

                const { data } = await bigcommerce.get(`/catalog/products/${pid}`);
                res.status(200).json(data);
            } catch (error) {
                const { message, response } = error;
                res.status(response?.status || 500).json({ message });
            }
            break;
        case 'POST':
            try {
                const { accessToken, storeHash } = await getSession(req);
                const bigcommerce = bigcommerceClient(accessToken, storeHash);
                
                const { data } = await bigcommerce.post(`/content/widget-templates`, body);
                res.status(200).json(data);
            } catch (error) {
                const { message, response } = error;
                res.status(response?.status || 500).json({ message });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT','POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }


}
