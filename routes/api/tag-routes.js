const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag
      }]
    })
    res.json(tags);

  } catch (err) {
    res.status(200).json(err)
  }

});

router.get('/:id', async (req, res) => {
  try {
    const tag_id = req.params.id;
    const tag = await Tag.findOne({
      where: {
        id: tag_id
      },
      include: [{
        model: Product,
        through: ProductTag
      }]
    })
    res.status(200).json(tag)
  } catch (err) {
    res.status(200).json(err)
  }
 
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body)
    res.json(tag)
  } catch (err) {
    res.status(500).res.json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.json(tag)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(tag)
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
