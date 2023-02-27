const Client = require('../models/Client')
const Project = require('../models/Project')

const {GraphQLObjectType, 
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
} = require ('graphql')

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () =>({
        id : {type: GraphQLID},
        name : {type: GraphQLString},
        email : {type: GraphQLString},
        phone : {type: GraphQLString}
    })
});


const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () =>({
        id : {type: GraphQLID},
        name : {type: GraphQLString},
        description : {type: GraphQLString},
        status : {type: GraphQLString},
        client : {
            type: ClientType,
            resolve(parent, args){
                return Client.findByPk(parent.clientID)
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent,args){
                return Client.findAll()
            }
        },
        client :{
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Client.findByPk(args.id)
            }
        }
        ,
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent,args){
                return Project.findAll()
            }
        },
        project :{
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Project.findByPk(args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})