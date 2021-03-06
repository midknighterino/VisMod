const ms = require("ms");

exports.run = async (client, message, args) => {
  let member = message.mentions.members.first();
  if(!member) return message.reply("Error: Please specify a member.");
  if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Error: You may not do that, check the role hierarchy.");
  if(!member.kickable) return message.channel.send("Error: This member isn't mutable, please check my perms.");


  let time = args.slice(1).join(" ");
  
  let modLogChannel = message.guild.channels.find(c => c.name === message.settings.modLogChannel);
  if(!modLogChannel) return message.channel.send(`Error: Please set up a moderation log by using \`${message.settings.prefix}set edit modLogChannel #channel-name\``);

  let embed = await client.generateModEmbed(member, "Mute", message.member, "Tempmute", time);
  if(!embed) return message.channel.send("Error: An unexpected error has occured... exiting.");

  let muteRole = message.guild.roles.find(r => r.name === message.settings.muteRole);
  if(!muteRole) return message.channel.send("Error: Please create a muterole");

  member.roles.add(muteRole);
  
  modLogChannel.send(embed);
  message.channel.send(embed);

  setTimeout(() => {
    member.roles.remove(muteRole);
    let embed = client.generateModEmbed(member, "Unmute", message.member);
    modLogChannel.send(embed);
    message.channel.send(`Everyone welcome back <@${member.user.id}>`);
  }, ms(time));
};

exports.help = {
  name: "m",
  description: "tempnute a user for five minutes.",
  usage: "tempmute @member <time>",
  category: "Moderation"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["tm"],
  permLevel: "Moderator"
};