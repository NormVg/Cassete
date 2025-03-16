import { usernameData } from "~/server/func/usernameData";
import { ClientBox,BoxFileURL } from "~/utils/BoxClient";


export default defineEventHandler(async (event) => {

  const { username ,song_id } = await getQuery(event);


  var user_cassette = await usernameData(username)

  // var user_tao_id = user_cassette[0].userID;

  var user_box_user_id = user_cassette[0].box_user_id;
  var user_box_client_id = user_cassette[0].box_client_id
  var user_box_client_secret = user_cassette[0].box_client_secret


  if (user_cassette.length === 0) {
    return "ERROR: user not found";
  }


  const boxClient = await ClientBox(user_box_user_id,user_box_client_id,user_box_client_secret);


  const url =  await BoxFileURL(boxClient,song_id)


  return {
    src: url,
  };
});
