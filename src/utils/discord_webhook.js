const { Embed, Webhook } = require("dhooks");
const traceback = require("traceback");

/**
 * Send a Discord announcement.
 * @param {string} webhook_url - The URL of the Discord webhook.
 * @param {Array} event - The event details.
 * @returns {boolean} - Returns true if the announcement was sent successfully, false otherwise.
 */
function send_discord_announcement(webhook_url, event) {
  try {
    const eventDetails = event[0];
    const w = new Webhook(webhook_url);
    const embed = new Embed({
      title: "📢  " + eventDetails.eventName,
      url: eventDetails.eventURL,
      description: eventDetails.eventDescription,
      color: 0x2F3136,
      timestamp: "now"
    });

    embed.setAuthor({
      name: "Open Source Community: VIT-AP",
      url: "https://github.com/Open-Source-Community-VIT-AP",
      icon_url: "https://avatars.githubusercontent.com/open-source-community-vit-ap"
    });

    embed.addField({
      name: "📍  Event Venue",
      value: eventDetails.eventVenue,
      inline: true
    });

    const dateAndTime = eventDetails.eventDate + " " + eventDetails.eventStartTime;
    embed.addField({
      name: "⏰  Date and Time",
      value: dateAndTime,
      inline: true
    });

    embed.addField({
      name: ":speaker:  Speakers",
      value: eventDetails.eventSpeaker,
      inline: false
    });

    embed.addField({
      name: "📖  Docs",
      value: eventDetails.eventDocumentation,
      inline: true
    });

    embed.setImage(eventDetails.eventLogo);

    embed.setFooter({
      text: eventDetails.eventCaption,
      icon_url: "https://i.ibb.co/rFv3nXZ/001-like.png"
    });

    w.send("@everyone", {
      embeds: [embed.toJSON()]
    });

    return true;
  } catch (error) {
    console.error("Exception occurred while trying to send Discord announcement...");
    console.error(error);
    return false;
  }
}
