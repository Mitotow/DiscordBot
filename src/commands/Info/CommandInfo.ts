import Command from "src/interfaces/Command";
import { Client, CommandInteraction, EmbedAuthorOptions, EmbedBuilder, Guild, Locale, SlashCommandBuilder } from 'discord.js';

const regions: Record<string, string> = {
    'id': ':flag_id:', // Indonesian
    'en-US': ':flag_us:', // English (US)
    'en-GB': ':flag_gb:', // English (GB)
    'bg': ':flag_bg:', // Bulgarian
    'zh-CN': ':flag_cn:', // Chinese (CN)
    'zh-TW': ':flag_tw:', // Chinese (TW)
    'hr': ':flag_hr:', // Croatian
    'cs': ':flag_cz:', // Czech
    'da': ':flag_dk:', // Danish
    'nl': ':flag_nl:', // Dutch
    'fi': ':flag_fi:', // Finnish
    'fr': ':flag_fr:', // French
    'de': ':flag_de:', // German
    'el': ':flag_gr:', // Greek
    'hi': ':flag_in:', // Hindi
    'hu': ':flag_hu:', // Hungarian
    'it': ':flag_it:', // Italian
    'ja': ':flag_jp:', // Japanese
    'ko': ':flag_kr:', // Korean
    'lt': ':flag_lt:', // Lithuanian
    'no': ':flag_no:', // Norwegian
    'pl': ':flag_pl:', // Polish
    'pt-BR': ':flag_br:', // Portuguese (BR)
    'ro': ':flag_ro:', // Romanian
    'ru': ':flag_ru:', // Russian
    'es-ES': ':flag_es:', // Spanish (ES)
    'sv-SE': ':flag_se:', // Swedish
    'th': ':flag_th:', // Thai
    'tr': ':flag_tr:', // Turkish
    'uk': ':flag_ua:', // Ukrainian
    'vi': ':flag_vn:', // Vietnamese    
};
  

const tierBoost = {
    '0': 'Tier 0 :sob:',
    '1': 'Tier 1 ! :small_blue_diamond:',
    '2': 'Tier 2 ! :large_blue_diamond:',
    '3': 'Tier 3 ! :diamond_shape_with_a_dot_inside:',
};

const CommandInfo: Command = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Reply by sending an embed containing server\'s information'),
    execute: async (client: Client, interaction: CommandInteraction) => {
        const author : EmbedAuthorOptions | null = client.user ? { name: client.user.displayName, iconURL: client.user.displayAvatarURL(), } : null;
        const guild : Guild | null = interaction.guild;

        if(guild == null) {
            // Could not get the guild, can't show guild's information
            await interaction.reply({ content: 'Can\'t get information about the guild', ephemeral: true });
            return;
        }

        const owner = await guild.fetchOwner();

        const embed = new EmbedBuilder()
            .setAuthor(author) // Set as author the bot's user if exists
            .setTitle(`${interaction.guild?.name}'s information`) // Embed's title
            .setDescription(guild.description) // Set as embed description the description of the guild
            .setFields([
                {name: 'Created At', value: guild.createdAt.toLocaleDateString(), inline: true}, // Creation date of the server
                {name: 'Region', value: `${guild.preferredLocale} ${regions[guild.preferredLocale]}`, inline: true}, // Preffered Region of the server
                {name: 'Members', value: guild.memberCount.toString()}, // Number of members (with bots)
                {name: 'TierBoost', value: `${guild.premiumTier} ${tierBoost[guild.premiumTier]}`, inline: true}, // Boost level of the server 
                {name: 'Boosters', value: guild.premiumSubscriptionCount ? guild.premiumSubscriptionCount.toString() : '0', inline: true}, // Number of person that boost the server
                {name: 'Owner', value: owner.user.tag}, // Discord tag of the owner
                {name: 'Channels', value: guild.channels.cache.size.toString(), inline: true}, // Number of channels created
                {name: 'Roles', value: guild.roles.cache.size.toString(), inline: true}, // Number of roles created
                {name: 'Emojis', value: guild.emojis.cache.size.toString(), inline: true}, // Number of custom emojis
            ])
            .setThumbnail(guild.iconURL()) // Icon of the server
            // Owner information is in the footer
            .setFooter({
                text: owner.displayName + ' 👑',
                iconURL: owner.displayAvatarURL(),
            })
            .setTimestamp(); // Add a sended date in the footer of the embed

        if(interaction.isRepliable()) await interaction.reply({ embeds: [embed], }); // Reply to the interaction
    }
}

export default CommandInfo;