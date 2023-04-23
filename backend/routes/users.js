// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Find user in the database
    const user = await db.findOne({ email });
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }})
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })