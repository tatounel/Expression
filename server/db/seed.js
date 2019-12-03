const db = require("./models");
const { Artist, Author, Content, Genre, Match, Portfolio, Style } = db;
var Sequelize = require("sequelize");

const ARTISTS = [
  {
    id: 1,
    name: "Phoebe Buffay",
    email: "pb@gmail.com",
    style: "abstract expressionism",
    bio: "birthed my brother's triplets",
    interests: "smelly cats",
    profile_pic: " "
  },
  {
    id: 2,
    name: "Michelangelo",
    email: "tmnt@gmail.com",
    style: "renaissance",
    bio: "coming out of my shell and i've been doing just fine",
    interests: "pizza and fun",
    profile_pic: " "
  },
  {
    id: 3,
    name: "Scooby Doo",
    email: "ilovescoobysnacks123@gmail.com",
    style: "etch a sketch",
    bio: "scooby-dooby-doo",
    interests: "being a meddling kid",
    profile_pic: " "
  }
];

const AUTHORS = [
  {
    id: 1,
    name: "Toni Morrison",
    email: "tm@gmail.com",
    genre: "fiction",
    bio: "RIP",
    interests: "writing emotional heartrending stories",
    profile_pic: " "
  },
  {
    id: 2,
    name: "Barack Obama",
    email: "44thpresident@gmail.com",
    genre: "memoir",
    bio:
      "taking a well deserved break, just doing some post presidential work, no biggie",
    interests: "yes we can",
    profile_pic: " "
  },
  {
    id: 3,
    name: "Shakespeare",
    email: "shakes@gmail.com",
    genre: "romance",
    bio: "hear ye, hear ye",
    interests: "helping students fail English since 1564",
    profile_pic: " "
  }
];

const CONTENTS = [
  {
    id: 1,
    title: "The Bluest Eye",
    text: `All of our waste which we dumped on her and which she absorbed. And all of our beauty, which was hers
        first and which she gave to us. All of us--all who knew her--felt so wholesome after we cleaned ourselves on her. 
        We were so beautiful when we stood astride her ugliness. Her simplicity decorated us, her guilt sanctified us, her pain 
        made us glow with health, her awkwardness made us think we had a sense of humor. Her inarticulateness made us believe 
        we were eloquent. Her poverty kept us generous. Even her waking dreams we used--to silence our own nightmares. And she 
        let us, and thereby deserved our contempt. We honed our egos on her, padded our characters with her frailty, and yawned 
        in the fantasy of our strength. And fantasy it was, for we were not strong, only aggressive; we were not free, merely
        licensed; we were not compassionate, we were polite; not good, but well behaved. We courted death in order to call
        ourselves brave, and hid like thieves from life. We substituted good grammar for intellect; we switched habits to 
        simulate maturity; we rearranged lies and called it truth, seeing in the new pattern of an old idea the Revelation and 
        the Word.`,
    authorId: 1,
    genreId: 1
  },
  {
    id: 2,
    title: "Dreams from My Father: A Story of Race and Inheritance",
    text: `I thought I could start over, you see. But now I know you can never start over. Not really. You think you have control, 
         but you are like a fly in somebody else’s web. Sometimes I think that’s why I like accounting. All day, you are only 
         dealing with numbers. You add them, multiply them, and if you are careful, you will always have a solution. There’s a 
         sequence there. An order. With numbers, you can have control….`,
    authorId: 2,
    genreId: 2
  },
  {
    id: 3,
    title: "Independence Day",
    text: `O serpent heart hid with a flowering face!
         Did ever a dragon keep so fair a cave?
         Beautiful tyrant, feind angelical, dove feather raven, wolvish-ravening 
         lamb! Despised substance of devinest show, just opposite to what thou 
         justly seemest - A dammed saint, an honourable villain!`,
    authorId: 3,
    genreId: 3
  }
];

const PORTFOLIOS = [
  {
    id: 1,
    title: "Gladys",
    location: "C:\\Friends\\Monicas\\Apt",
    artistId: 1,
    styleId: 1
  },
  {
    id: 2,
    title: "TMNT",
    location: "C:\\TMNT\\Manhattan\\Sewers",
    artistId: 2,
    styleId: 2
  },
  {
    id: 3,
    title: "Scooby Snacks",
    location: "C:\\ScoobyDooMystery\\Machine",
    artistId: 3,
    styleId: 3
  }
];

const GENRES = [
  { id: 1, name: "Fiction" },
  { id: 2, name: "Memoir" },
  { id: 3, name: "Romance" }
];

const STYLES = [
  { id: 1, name: "Abstract Expressionism" },
  { id: 2, name: "Renaissance" },
  { id: 3, name: "Etch a Sketch" }
];

const MATCHES = [
  { id: 1, artistId: 1, authorId: 1 },
  { id: 2, artistId: 2, authorId: 2 },
  { id: 3, artistId: 3, authorId: 3 }
];

(function seed() {
  return db.sequelize
    .sync({ force: true })
    .then(() => {
      // Create all the entries
      let artistPromises = ARTISTS.map(a1 =>
        Artist.create(a1).catch(Sequelize.ValidationError, function(err) {
          console.log(err);
        })
      );
      let authorPromises = AUTHORS.map(a2 =>
        Author.create(a2).catch(Sequelize.ValidationError, function(err) {
          console.log(err);
        })
      );
      let contentPromises = CONTENTS.map(c => Content.create(c));
      let genrePromises = GENRES.map(g => Genre.create(g));
      let matchPromises = MATCHES.map(m => Match.create(m));
      let portfolioPromises = PORTFOLIOS.map(p => Portfolio.create(p));
      let stylePromises = STYLES.map(s => Style.create(s));

      return Promise.all([
        ...artistPromises,
        ...authorPromises,
        ...contentPromises,
        ...genrePromises,
        ...matchPromises,
        ...portfolioPromises,
        ...stylePromises
      ]);
    })
    .then(() => {
      //Create the associations
      let portfoliosPromises = PORTFOLIOS.map(ps => {
        let artistPromise = Artist.findByPk(ps.artistId);
        let portfolioPromise = Portfolio.findByPk(ps.id);
        let stylePromise = Style.findByPk(ps.styleId);
        return Promise.all([
          artistPromise,
          portfolioPromise,
          stylePromise
        ]).then(([artist, portfolio, style]) => {
          style.setPortfolio(portfolio);
          return artist.addPortfolio(portfolio);
        });
      });

      let contentsPromises = CONTENTS.map(cs => {
        let authorPromise = Author.findByPk(cs.authorId);
        let contentPromise = Content.findByPk(cs.id);
        let genrePromise = Genre.findByPk(cs.genreId);
        return Promise.all([authorPromise, contentPromise, genrePromise]).then(
          ([author, content, genre]) => {
            genre.setContent(content);
            return author.addContent(content);
          }
        );
      });

      let matchesPromises = MATCHES.map(ms => {
        let authorPromise = Author.findByPk(ms.authorId);
        let artistPromise = Artist.findByPk(ms.artistId);
        let matchPromise = Match.findByPk(ms.id);
        return Promise.all([authorPromise, artistPromise, matchPromise]).then(
          ([author, artist, match]) => {
            let artistMatch = match.setArtist(artist);
            let authorMatch = match.setAuthor(author);
            return Promise.all([artistMatch, authorMatch]);
          }
        );
      });

      return Promise.all([
        portfoliosPromises,
        contentsPromises,
        matchesPromises
      ]);
    });
})();

// module.exports = seed;
