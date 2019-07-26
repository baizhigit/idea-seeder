const faker = require('faker');
const axios = require('axios');

const IDEA_GENERATOR = 'https://appideagenerator.com/call.php';
const IDEA_API = 'http://localhost:4000';

const randomNum = () => Math.floor(Math.random() * 10);

const generateIdea = async () => {
  const { data } = await axios.get(IDEA_GENERATOR);
  return data;
};

const generateUser = async () => {
  const { data } = await axios.post(`${IDEA_API}/register`, {
    username: faker.internet.userName(),
    password: 'password'
  });

  return data.token;
};

const postNewIdea = async token => {
  const idea = await generateIdea();
  const { data } = await axios.post(
    `${IDEA_API}/api/ideas`,
    {
      idea,
      description: faker.lorem.paragraph()
    },
    {
      headers: { authorization: `Bearer ${token}` }
    }
  );

  console.log(data);
  return idea;
};

(async () => {
  const randUserNum = randomNum();
  const randIdeaNum = randomNum();

  for (let i = 0; i < randUserNum; i++) {
    const token = await generateUser();
    for (let j = 0; j < randIdeaNum; j++) {
      const idea = await postNewIdea(token);
    }
  }
})();
