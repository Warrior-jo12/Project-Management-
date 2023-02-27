const Client = require('../models/Client')
const Project = require('../models/Project')

const {GraphQLObjectType, 
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType
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


//Mutation

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient: {
            type: ClientType,
            args:{
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })
                return client.save()
            }
        },

        deleteClient: {
            type: ClientType,
            args: {
                id:{type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return Client.destroy({where: {id: args.id}})
            }
        },

        addProject:{
            type:ProjectType,
            args: {
                name:{type: GraphQLNonNull(GraphQLString)},
                description:{type: GraphQLNonNull(GraphQLString)},
                status:{
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': {value: 'Not Started'},
                            'Progress': { value: 'In Progress'},
                            'completed': {value: 'Completed'}
                        }
                    }),
                    defaultValue: 'Not Started'
                },
                clientID: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientID: args.clientID
                })

                return project.save()
            }
        },
        deleteProject: {
            type: ProjectType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return Project.destroy({where: {id: args.id}})
            }
        },

        updateProject: {
            type: ProjectType,
            args: {
                id: {type:GraphQLNonNull(GraphQLID)},
                name:{type: GraphQLNonNull(GraphQLString)},
                description:{type: GraphQLNonNull(GraphQLString)},
                status:{
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            'new': {value: 'Not Started'},
                            'Progress': { value: 'In Progress'},
                            'completed': {value: 'Completed'}
                        }
                    }),
                }, 
            },
            resolve(parent, args){
                return Project.upsert(
                    {   id: args.id,
                        name: args.name, 
                        description: args.description,
                        status: args.status
                    },
                    { returning: true } 
                )
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
})