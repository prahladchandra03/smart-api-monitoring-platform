import express from 'express';
import { getEndpoints, createEndpoint, deleteEndpoint } from './endpointController';

const router = express.Router();

router.get('/', getEndpoints);
router.post('/', createEndpoint);
router.delete('/:id', deleteEndpoint);

export default router;