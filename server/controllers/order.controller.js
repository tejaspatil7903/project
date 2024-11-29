import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress, phone, deliveryInstructions } = req.body;
    
    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      deliveryAddress,
      phone,
      deliveryInstructions,
      status: 'pending'
    });

    await order.populate('items.menuItem');
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const query = {};
    
    if (req.user.role === 'user') {
      query.user = req.user._id;
    } else if (req.user.role === 'delivery') {
      query.deliveryPerson = req.user._id;
    }

    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate('items.menuItem')
      .populate('deliveryPerson', 'name')
      .sort('-createdAt');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.menuItem')
      .populate('deliveryPerson', 'name');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    if (status === 'out-for-delivery' && req.user.role === 'delivery') {
      order.deliveryPerson = req.user._id;
    }

    await order.save();
    await order.populate('user', 'name email');
    await order.populate('items.menuItem');
    await order.populate('deliveryPerson', 'name');

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};