const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['hf'],
			description: 'Gives you a random horse fact',
		});
	}

	run(message) {
        return message.sendMessage(facts[Math.floor(Math.random() * facts.length)]);
	}

};
/* eslint-disable-max-len */
const facts = [
    'Horses can sleep standing up by locking their leg joints.',
    'Horses experience REM (rapid eye movement) during sleep, which means they most likely dream.',
    'The Hindus associate the horse with the cosmos, and a white horse was considered the last incarnation of Vishnu.',
    'The word “chivalry” comes from the French cheval, meaning horse.',
    'Some horses are able to figure out how to undo the doors of other horses and let them out.',
    'The earliest member of the horse family is the appropriately named “dawn horse,” or “Eohippus.” It dates back 55 million years.',
    'The horse head in the famous horse scene in The Godfather was actually a real, decapitated horse head.',
    'Unlike humans, horses have a functioning appendix that digests leaves, leading some scientist to believe that the human appendix may have had a similar function.',
    "Horses drink a lot of water, at least 25 gallons of water a day. In fact, water makes up 50% of a horse's total body weight.",
    'A horse’s teeth never stop growing.',
    'Feeding a horse cut grass can give them colic.',
    'In the early 20th century, cars were seen as an environmentally friendly solution to horse drawn carriages because horse poop and carcasses polluted the city. One city horse could produce between 15 and 30 pounds of manure day.',
    'In 1900, there were 15,000 horses in New York City. They produced enough manure in one year to create a pile 175 feet high, covering an acre of land, and breeding 16 billion flies.',
    'A horse has only one functional toe on each foot and its thick toenail is actually the hoof. It makes contact with the ground like a ballet dancer en pointe.',
    'In literature, art, and dream theory, the horse is often a symbol imbued with various meanings, ranging from power to beauty and even sexual prowess.In literature, art, and dream theory, the horse is often a symbol imbued with various meanings, ranging from power to beauty and even sexual prowess.',
    'The goddess Demeter (the goddess of fertility, grain, and the pure) had as her image a black mare’s head, and her priestesses were considered her “foals.”',
    'Horses have a strong band of muscles around their esophagus. This band is so strong that a horse’s stomach would burst before it would vomit.',
    'Though the word “hippopotamus” means “river horse,” a hippo is actually more closely related to the pig than the horse.',
    'Horses, zebras, and asses (as well as other equids) belong to the Order Perissodactyla, which is Greek from “odd-numbered finger or toe.',
    'The oldest animal carving ever found is of horse. It dates back 31,000 years in southern Germany.',
    'When a horse curls up its upper lip and bares its teeth, it\'s not laughing at you; it’s directing scents toward a special olfactory gland in the back of its nasal passage.',
    'There are about 58 million horses in the world.',
    'The horses’ closest relative is not the cow, pig, or goat--but the rhinoceros.',
    'Arab horses are one of the strongest endurance runners in the animal kingdom and are capable of running over 100 miles (160 km) without rest.',
    'Author John Trotwood Moore once states “Wherever Man has left his footprint in the long ascent from barbarism or civilization, we find the hoof print of a horse beside it.”',
    'According to the Bible, four horses will usher in the apocalypse.',
  ]