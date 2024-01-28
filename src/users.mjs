const users = [
    {
      id: 1,
      username: "johndoe",
      password: "password1",
      email: "johndoe@example.com"
    },
    {
      id: 2,
      username: "janedoe",
      password: "password2",
      email: "janedoe@example.com"
    },
    {
      id: 3,
      username: "bobsmith",
      password: "password3",
      email: "bobsmith@example.com"
    }
  ];

  // TODO: implement route handlers below for users

  const getUsers = (req, res) => {
    res.json(users);
  };

  const getUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  };

  const postUser = (req, res) => {
    const newUser = req.body;

    if (!newUser.username || !newUser.password || !newUser.email) {
      return res.status(400).json({ error: 'Incomplete user information' });
    }

    newUser.id = users.length + 1;
    users.push(newUser);

    res.status(201).json({ message: 'User created successfully', user: newUser });
  };

  const putUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUserData = req.body;
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
      if (!updatedUserData.username || !updatedUserData.password || !updatedUserData.email) {
        return res.status(400).json({ error: 'Incomplete user information' });
      }

      users[userIndex] = { ...users[userIndex], ...updatedUserData };
      res.json({ message: 'User updated successfully', user: users[userIndex] });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  };

  // Dummy login, returns user object if username & password match
  const postLogin = (req, res) => {
    const userCreds = req.body;
    if (!userCreds.username || !userCreds.password) {
      return res.sendStatus(400);
    }
    const userFound = users.find(user => user.username == userCreds.username);
    // user not found
    if (!userFound) {
      return res.status(403).json({error: 'username/password invalid'});
    }
    // check if posted password matches to user found password
    if (userFound.password === userCreds.password) {
      res.json({message: 'logged in successfully', user: userFound});
    } else {
      return res.status(403).json({error: 'username/password invalid'});
    }
  };

export {getUsers, getUserById, postUser, putUser, postLogin};
