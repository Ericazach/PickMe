import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ericazach.pickme",
  projectId: "66c4d61b000b093f55d0",
  databaseId: "66c4d8c700365d6335cf",
  usersCollectionId: "66c4d9080027bdbb413f",
  plansCollectionsId: "66c4d99c003b0577cda2",
  storageId: "66ccb37b00015ee77f3d"
}

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform)


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {

  try {
    const newAccount = await account.create(ID.unique(), email, password, username)

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password);

    const newUser = await databases.createDocument(config.databaseId, config.usersCollectionId, ID.unique(), {
      accountId: newAccount.$id,
      email,
      username,
      avatar: avatarUrl
    })

    return newUser;
  } catch (error) {

  }
}

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {

  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(config.databaseId, config.usersCollectionId, [Query.equal("accountId", currentAccount.$id)])

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error)
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createActivity(form) {
  try {
    const newPost = await databases.createDocument(
      config.databaseId,
      config.plansCollectionsId,
      ID.unique(),
      {
        title: form.title,
        activity1: form.planOne,
        activity2: form.planTwo,
        activity3: form.planThree,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.plansCollectionsId,
      [
        Query.equal("creator", userId),
        Query.orderDesc("$createdAt") // Ordena por fecha de creación de forma descendente
      ]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error.message || "Error fetching user posts");
  }
}

// export async function searchActivity(query) {
//   try {
//     const posts = await databases.listDocuments(
//       config.databaseId,
//       config.plansCollectionsId,
//       [Query.search("$id", query)]
//     );
//     if (!posts) throw new Error("Something went wrong");

//     return posts;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

export async function getActivityById(documentId) {
  try {
    const post = await databases.getDocument(
      config.databaseId,
      config.plansCollectionsId,
      documentId  // Usa directamente el ID del documento
    );
    return post;
  } catch (error) {
    throw new Error(error.message || "Error retrieving document");
  }
}

export async function editActivity(form, documentId) {
  try {
    const editedPost = await databases.updateDocument(
      config.databaseId,
      config.plansCollectionsId,
      form.documentId,
      {
        title: form.title,
        activity1: form.planOne,
        activity2: form.planTwo,
        activity3: form.planThree
      }
    );
    return editedPost;
  } catch (error) {
    throw new Error(error.message || "Error editing document");
  }
}