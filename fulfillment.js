// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  
  function welcome(agent) {
    agent.add(`Hi! I am your travel planner,you can ask me to book your flights and hotel rooms`);
    agent.add(`Quick Suggestions`);
    agent.add(new Suggestion(`Book a flight`));
    agent.add(new Suggestion(`Book a room`));
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function flightBookingHandler(agent){
   let  {origin,destination} = agent.parameters;
  
    if(origin && destination){
    	agent.setFollowupEvent(`TRAVEL_EVENT`);
    }else if(!origin && !destination){
    	agent.setFollowupEvent(`ORIGIN_EVENT`);
    }else if(!origin && destination){
    	agent.setFollowupEvent(`ORIGIN_EVENT`);
    } else if(!destination && origin){
    	agent.setFollowupEvent(`DESTINATION_EVENT`);
    }

  }
  
  function travelDateHandler(agent){
    let { travel_date } = agent.parameters;

    if(!travel_date){
      agent.add(`For when you want to book a flight ?`);
      agent.add(`Quick Suggestions`);
      agent.add(new Suggestion(`Today`));
      agent.add(new Suggestion(`Tomorrow`));
      agent.add(new Suggestion(`Friday`));
    } else {
        agent.setFollowupEvent(`CLASSTYPE_EVENT`); 
     }
  }
  
  function classTypeHandler(agent){  
    let {travel_date,origin,destination} = agent.parameters;
    
    if(new Date(travel_date).toLocaleDateString() == new Date().toLocaleDateString() || (agent.queryResult && agent.queryResult.queryText === 'Today')) { 
     // case for today
        agent.add(`No flights are available for today.`);
      	agent.add(`Quick Suggestions`);
        agent.add(new Suggestion(`Change Date`));
        agent.add(new Suggestion(`Change Destination`));
        agent.add(new Suggestion(`Start Over`));
     
     } else {
    	  agent.add(`Which class you want to travel ?`);
      	  agent.add(`Quick Suggestions`);
          agent.add(new Suggestion(`Economy`));
          agent.add(new Suggestion(`Business`));
          agent.add(new Suggestion(`Premium Economy`));
       	  agent.add(new Suggestion(`First Class`));
       	  agent.add(new Suggestion(`Change Destination`));
       	  agent.add(new Suggestion(`Start Over`));
    }
  }
  
  function seatingSelectionNoHandler(agent){
      const {seat_no} = agent.parameters;
      if(seat_no){
        if(['A1','B1','C1','A2','A3','A4','A5','A6','B2','B3','B4','B5','B6','C2','C3','C4','C5','C6'].indexOf(seat_no) !== -1){
           agent.add(`Please complete the payment by clicking here down the link.`);
           agent.add(`   `);
           agent.add(new Suggestion(`https://dummy.com`));
        } else {
        	agent.setFollowupEvent(`WITH_SEAT_NUMBER_EVENT`);
        }
      } else {
  	     agent.add(`Please complete the payment by clicking here down the link.`);
         agent.add(`   `);
         agent.add(new Suggestion(`https://dummy.com`));
     }
  }

  function seatingSelectionYesHandler(agent){
    let { origin, destination, class_type }   = agent.parameters;
    console.log(JSON.stringify(agent.contexts)); 
    agent.add(`Awesome! Please select your seat for flight from ${origin} to ${destination} for ${class_type}?`);
    agent.add(` `);
    agent.add(new Suggestion(`A1`));
    agent.add(new Suggestion(`A2`));
    agent.add(new Suggestion(`A3`));
    agent.add(new Suggestion(`A4`));
    agent.add(new Suggestion(`A5`));
    agent.add(new Suggestion(`A6`));
    agent.add(new Suggestion(`B1`));
    agent.add(new Suggestion(`B2`));
    agent.add(new Suggestion(`B3`));
    agent.add(new Suggestion(`B4`));
    agent.add(new Suggestion(`B5`));
    agent.add(new Suggestion(`B6`));
    agent.add(new Suggestion(`C1`));
    agent.add(new Suggestion(`C2`));
    agent.add(new Suggestion(`C3`));
    agent.add(new Suggestion(`C4`));
    agent.add(new Suggestion(`C5`));
    agent.add(new Suggestion(`C6`));
  }
  
  function makeid(l) {
	var text = "";
	var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for(var i=0; i < l; i++ ){  
		text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
	return text;
  }

  
  function paymentHandler(agent){
     const bookingId = makeid(12);
     if(bookingId){
      agent.add(`Thank you for your payment.Your tickets have been booked.Your booking ID ${bookingId}`);
      agent.add(`     `);
      agent.add(`Do you want to book hotel rooms also ?`); 
     }
  }

  function conversationEndHandler(agent){
    agent.clearOutgoingContexts();  
    agent.clearContext('seatInfo');
    agent.clearContext('payment-followup');
    agent.clearContext('flightbooking-followup');
    agent.clearContext('classtypeinfo');
    agent.end(`Okay. Happy to help you. You have a nice day!`);
  }
  
  
  
  
  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
   function googleAssistantHandler(agent) {
     let conv = agent.conv(); // Get Actions on Google library conv instance
     conv.ask('Hello from the Actions on Google client library!'); // Use Actions on Google library
     agent.add(conv); // Add Actions on Google library responses to your agent's response
   }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('FlightBooking', flightBookingHandler);
  intentMap.set('FlightBooking.TravelDate',travelDateHandler);
  intentMap.set('FlightBooking.TravelDate.ClassType', classTypeHandler);
  intentMap.set('FlightBooking.TravelDate.ClassType.Seat.No',seatingSelectionNoHandler);
  intentMap.set('FlightBooking.TravelDate.ClassType.Seat.Yes',seatingSelectionYesHandler);
  intentMap.set('Payment',paymentHandler);
  intentMap.set('Payment.ConversationEnd',conversationEndHandler);
  // intentMap.set('FlightBooking.TravelDate.ClassType.Seat', seatHandler);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
  if(agent.action === 'withNoSeatAction'){
    console.log('HOOOOOLLLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    //agent.setFollowupEvent(`PAYMENT_EVENT`);
  }
});
