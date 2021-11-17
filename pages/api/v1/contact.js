const handler = (req, res) => {
  if (req.method === 'POST') {
    console.log(req.body);
    // try {
    //   throw new Error('Error server');
    // } catch (error) {
    //   return res.status(500).json({ msgError: error.message });
    // }
    return res.status(200).json({ msgSuccess: 'Email have been send' });
  }
};

export default handler;
