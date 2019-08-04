const  graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql;

const movie = [
  { id: '1', name: 'Pulp fiction', genre: 'Creme', directorsId: '1' },
  { id: '2', name: '1984', genre: 'Sci-Fi', directorsId: '2' },
  { id: 3, name: 'V for vrndetta', genre: 'Sci-Fi-Triller', directorsId: '3' },
  { id: 4, name: 'Snatch', genre: 'Creme-Comedy', directorsId: '4' }
];

const directiors = [
  { id: '1', name: 'Quentin Tarantino', age: 55 },
  { id: '2', name: 'Michael Radford', age: 72 },
  { id: '3', name: 'James McTeigue', age: 51},
  { id: '4', name: 'Guy Ritchie', age: 55 }
];


const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorsType,
      resolve(parent, args) {
        return directiors.find(directiors => directiors.id == parent.id);
      }
    }
  })
});


const DirectorsType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return movie.find(movie => movie.id == args.id);
      }
    },
    directiors: {
      type: DirectorsType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return directiors.find(directiors => directiors.id == args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query,
});