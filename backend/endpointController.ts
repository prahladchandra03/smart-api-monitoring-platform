import { Request, Response } from 'express';
import Endpoint from './Endpoint';

export const getEndpoints = async (req: Request, res: Response) => {
  try {
    const endpoints = await Endpoint.find().sort({ createdAt: -1 });
    res.json(endpoints);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createEndpoint = async (req: Request, res: Response) => {
  try {
    const { name, url, method, frequency, userId } = req.body;
    const newEndpoint = new Endpoint({
      name,
      url,
      method,
      frequency,
      userId,
      status: 'active'
    });
    const savedEndpoint = await newEndpoint.save();
    res.status(201).json(savedEndpoint);
  } catch (error) {
    res.status(400).json({ message: 'Error creating endpoint' });
  }
};

export const deleteEndpoint = async (req: Request, res: Response) => {
  try {
    await Endpoint.findByIdAndDelete(req.params.id);
    res.json({ message: 'Endpoint deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting endpoint' });
  }
};