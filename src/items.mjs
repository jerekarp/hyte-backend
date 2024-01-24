// mock data for simple API
const items = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
    {id: 3, name: 'Item kolme'},
    {id: 4, name: 'Item neljä'},
];

  const getItems = (req, res) => {
    res.json(items);
};

const getItemById = (req, res) => {
    // TODO: palauta vain se objekti, jonka id vastaa pyydettyä
    console.log('requested item id', req.params.id);
    let item = items.find(item => item.id === parseInt(req.params.id));
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Invalid object'});
    }
};

const postItem = (req, res) => {
    // TODO (vapaaehtonen, jatketaan tästä ens kerralla): lisää postattu item items-taulukkoon
    res.json({message: 'item created'});
};

const deleteItem = (req, res) => {
    // TODO: implement delete
    res.json({message: 'delete placeholder'});
};

const putItem = (req, res) => {
    // TODO: implement modify item
    res.json({message: 'putplaceholder'});
};

export {getItems, getItemById, postItem, deleteItem, putItem};
