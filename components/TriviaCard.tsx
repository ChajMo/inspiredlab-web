"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Facebook,
  Copy,
  Share2,
  Download,
  Sprout,
  Compass,
  BookOpen,
  Trophy,
  Lightbulb,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { getBadgeTier, type BadgeTier } from "@/lib/trivia-badges";

type TriviaQ = {
  category: "Culture" | "History" | "Science" | "Geography";
  question: string;
  choices: string[];
  answerIndex: number;
  explain?: string;
};

// Color-codes each question's category badge. Reuses the same palette as the
// badge tiers (lib/trivia-badges.ts) so the whole trivia experience feels
// like one connected color language.
const CATEGORY_STYLES: Record<TriviaQ["category"], { accent: string; bg: string }> = {
  Culture: { accent: "#B45B18", bg: "#FFE8D2" },
  History: { accent: "#1D4E89", bg: "#DCEEFC" },
  Science: { accent: "#0F7A55", bg: "#D6F5EA" },
  Geography: { accent: "#6B3FA0", bg: "#EEE3FB" },
};

const ANSWER_LETTERS = ["A", "B", "C", "D"];

const QUESTION_BANK: TriviaQ[] = [
  {
    category: "Culture",
    question: "Which event is widely recognized as Saint Kitts & Nevis’s annual Carnival celebration?",
    choices: ["Culturama", "Sugar Mas", "Jounen Kwéyòl", "Crop Over"],
    answerIndex: 1,
    explain: "Sugar Mas is the national carnival celebration commonly associated with late Dec–early Jan.",
  },
{
  question: "The Buckley’s Uprising (1935) in Saint Kitts was sparked by what major issue?",
  choices: [
    "A dispute over fishing rights",
    "Unfair wages and harsh working conditions on sugar plantations",
    "A disagreement between political parties",
    "A hurricane recovery effort"
  ],
  answerIndex: 1,
  category: "History",
  explain: "The Buckley’s Uprising was a labor revolt driven by poor wages and harsh conditions on sugar plantations. It became a turning point in the push for workers’ rights and political change in Saint Kitts and Nevis."
},
  {
    category: "Science",
    question: "In island ecosystems, mangroves are especially important because they…",
    choices: [
      "Increase ocean salinity",
      "Protect shorelines and support nurseries for marine life",
      "Reduce biodiversity",
      "Only grow in deep water",
    ],
    answerIndex: 1,
    explain: "Mangroves reduce erosion, buffer storms, and provide habitat for many species.",
  },
  {
    category: "History",
    question: "The Caribbean Sea is part of which ocean?",
    choices: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
    answerIndex: 0,
  },
  // Add more below...
  {
  category: "History",
  question: "Which Caribbean nation became the first free Black republic in 1804 after a successful revolution?",
  choices: ["Jamaica", "Barbados", "Haiti", "Trinidad and Tobago"],
  answerIndex: 2,
  explain: "Haiti became independent in 1804 after the Haitian Revolution."
},
{
  category: "History",
  question: "Who was one of the best-known leaders of the Haitian independence movement during the revolution?",
  choices: ["Marcus Garvey", "Toussaint Louverture", "Eric Williams", "Sam Sharpe"],
  answerIndex: 1,
  explain: "Toussaint Louverture was a major leader of the Haitian Revolution, though Haiti declared independence after his death."
},
{
  category: "History",
  question: "The Garifuna people trace their origins to the intermingling of Africans and Indigenous Caribbean peoples on which island?",
  choices: ["Saint Vincent", "Cuba", "Puerto Rico", "Jamaica"],
  answerIndex: 0,
  explain: "Garifuna culture emerged on Saint Vincent before forced deportation to Central America."
},
{
  category: "History",
  question: "Marcus Garvey founded the Universal Negro Improvement Association (UNIA) in which Caribbean country?",
  choices: ["Trinidad and Tobago", "Barbados", "Jamaica", "Haiti"],
  answerIndex: 2,
  explain: "Garvey founded the UNIA in Jamaica in 1914."
},
{
  category: "Culture",
  question: "Which Caribbean poet won the Nobel Prize in Literature in 1992 for work that reflects the region’s history and identity?",
  choices: ["Derek Walcott", "Aimé Césaire", "Kamau Brathwaite", "George Lamming"],
  answerIndex: 0,
  explain: "Derek Walcott of Saint Lucia won the Nobel Prize in Literature in 1992. His poetry explores Caribbean identity, history, language, and the legacy of colonialism."
},
{
  category: "History",
  question: "Which Caribbean historian and writer wrote 'The Black Jacobins,' a landmark history of the Haitian Revolution?",
  choices: ["Aimé Césaire", "Frantz Fanon", "C.L.R. James", "George Lamming"],
  answerIndex: 2,
  explain: "C.L.R. James of Trinidad wrote The Black Jacobins."
},
{
  category: "History",
  question: "What were Maroon communities in the Caribbean best known for?",
  choices: [
    "Running colonial schools",
    "Escaping their oppressors and building independent communities",
    "Importing plantation goods",
    "Serving as European naval bases"
  ],
  answerIndex: 1,
  explain: "Maroon communities were founded by people who escaped slavery and defended their freedom."
},
{
  category: "History",
  question: "St.Kitts and Nevis became independent in what year?",
  choices: ["1990", "1975", "1983", "1966"],
  answerIndex: 2,
  explain: "St.Kitts and Nevis became independent on September 19, 1983."
},
{
  category: "History",
  question: "Which Indigenous people are most closely associated with the Lesser Antilles at the time of European conquest?",
  choices: ["Taíno", "Carib/Kalinago", "Inca", "Maya"],
  answerIndex: 1,
  explain: "The Carib, also known today as Kalinago, were associated with the Lesser Antilles."
},
{
  category: "History",
  question: "Why is the Haitian Revolution so important in world history?",
  choices: [
    "It created the first railway in the Caribbean",
    "It led to the first free Black republic and challenged slavery worldwide",
    "It introduced sugar cultivation to the region",
    "It unified all Caribbean islands into one country"
  ],
  answerIndex: 1,
  explain: "The Haitian Revolution was a major anti-slavery and anti-colonial turning point in global history."
},
{
  category: "History",
  question: "Which statement best reflects a decolonized view of Caribbean history?",
  choices: [
    "Caribbean history began with European arrival",
    "The Caribbean’s most important contributions were plantation exports",
    "Caribbean people have long shaped the world through resistance, creativity, and knowledge",
    "The Caribbean has little connection to global history"
  ],
  answerIndex: 2,
  explain: "A decolonized approach centers Caribbean agency, knowledge, resistance, and global influence."
},
{
  category: "Culture",
  question: "Jamaica Kincaid, an influential Caribbean writer, was born in which country?",
  choices: ["Jamaica", "Antigua and Barbuda", "Barbados", "Trinidad and Tobago"],
  answerIndex: 1,
  explain: "Jamaica Kincaid was born in Antigua (now Antigua and Barbuda). Her writing explores identity, memory, and the lasting impacts of colonialism."
},
{
  question: "Which musical instrument was invented in Trinidad and Tobago and is now recognized worldwide?",
  choices: ["Steelpan", "Violin", "Guitar", "Saxophone"],
  answerIndex: 0,
  category: "Culture",
  explain: "The steelpan (steel drum) was invented in Trinidad and Tobago and is the only acoustic instrument created in the 20th century."
},
{
  question: "Callaloo, a popular Caribbean dish, is primarily made from what type of ingredient?",
  choices: [
    "Seafood",
    "Leafy greens",
    "Rice",
    "Breadfruit"
  ],
  answerIndex: 1,
  category: "Culture",
  explain: "Callaloo is made from leafy greens such as dasheen bush or amaranth and varies across the Caribbean."
},
{
  question: "Breadfruit, now a Caribbean staple, originally came from which region?",
  choices: [
    "West Africa",
    "Southeast Asia and the Pacific",
    "Europe",
    "South America"
  ],
  answerIndex: 1,
  category: "History",
  explain: "Breadfruit was originally introduced from the Pacific as a cheap food source by the oppressors of enslaved people but became an important Caribbean food due to its versatility and nutritional value."
},
{
  question: "The Caribbean has given rise to many globally influential music genres. Which of the following is NOT a genre that originated in the Caribbean?",
  choices: ["Reggae", "Soca", "Hip-hop", "Calypso"],
  answerIndex: 2,
  category: "Culture",
  explain: "Reggae (Jamaica), soca (Trinidad and Tobago), and calypso (Trinidad and Tobago) all originated in the Caribbean. Hip-hop developed in the United States, though it was heavily influenced by Caribbean culture."
},
{
  question: "What is the national dish of Saint Kitts and Nevis?",
  choices: [
    "Goat water",
    "Stewed saltfish with spicy plantains, breadfruit, and coconut dumplings",
    "Pelau",
    "Callaloo"
  ],
  answerIndex: 1,
  category: "Culture",
  explain: "The national dish of Saint Kitts and Nevis is stewed saltfish served with spicy plantains, seasoned breadfruit, and coconut dumplings."
},
{
  question: "Caribbean Carnival is best understood as a celebration of what?",
  choices: [
    "Only European traditions",
    "Freedom, cultural expression, and community identity",
    "Military victories",
    "Agricultural exports"
  ],
  answerIndex: 1,
  category: "Culture",
  explain: "Carnival reflects freedom, creativity, and the blending of cultural traditions shaped by Caribbean history."
},
{
  question: "In Caribbean Carnival, what does “playing mas” mean?",
  choices: [
    "Watching performances from the audience",
    "Participating in costume and street celebrations",
    "Cooking traditional foods",
    "Performing only on stage"
  ],
  answerIndex: 1,
  category: "Culture",
  explain: "“Mas” comes from “masquerade” and refers to actively participating in Carnival festivities."
},
{
  question: "Calypso music, is known for doing what?",
  choices: [
    "Only instrumental performances",
    "Telling stories and commenting on society",
    "Being used only in religious ceremonies",
    "Focusing on classical music traditions"
  ],
  answerIndex: 1,
  category: "Culture",
  explain: "Calypso music often uses humor and storytelling to comment on social and political issues."
},
{
  question: "Carnival costumes are best known for being:",
  choices: [
    "Simple and uniform",
    "Bright, creative, and expressive",
    "Only black and white",
    "Made only from natural fibers"
  ],
  answerIndex: 1,
  category: "Culture",
  explain: "Carnival costumes showcase creativity, color, and storytelling through design."
},
{
  question: "What role does Carnival play in Caribbean communities?",
  choices: [
    "It is only for tourists",
    "It is a major space for cultural expression, community, and creativity",
    "It is limited to schools only",
    "It replaces traditional culture"
  ],
  answerIndex: 1,
  category: "Culture",
  explain: "Carnival is deeply rooted in community life and cultural expression across the Caribbean."
},

// --- Wider Caribbean expansion: Antigua & Barbuda, The Bahamas, Barbados,
// Belize, Cuba, Dominica, Dominican Republic, Grenada, Guyana, Puerto Rico,
// Saint Lucia, Saint Vincent & the Grenadines, Suriname, Martinique &
// Guadeloupe, Aruba & Curaçao, and smaller territories — added so the game
// represents the whole Caribbean, not just the larger, more familiar nations.

// Antigua and Barbuda
{
  category: "Geography",
  question: "What is the capital of Antigua and Barbuda?",
  choices: ["St. John's", "Bridgetown", "Basseterre", "Castries"],
  answerIndex: 0,
  explain: "St. John's is the capital and largest city of Antigua and Barbuda.",
},
{
  category: "Geography",
  question: "Which seabird, famous for the male's dramatic inflatable red throat pouch, is Antigua and Barbuda's national bird?",
  choices: ["Magnificent frigatebird", "Caribbean flamingo", "Brown pelican", "Roseate spoonbill"],
  answerIndex: 0,
  explain: "Barbuda's Codrington Lagoon hosts one of the largest magnificent frigatebird breeding colonies in the world.",
},
{
  category: "Culture",
  question: "Antiguan cricket legend Sir Vivian Richards is remembered for what remarkable feat as West Indies captain?",
  choices: [
    "Never losing a Test series as captain",
    "Winning the Nobel Peace Prize",
    "Founding the Caribbean's first university",
    "Leading Antigua's independence movement",
  ],
  answerIndex: 0,
  explain: "Viv Richards captained the West Indies from 1984-1991 without ever losing a Test series, and is regarded as one of cricket's greatest batsmen.",
},

// The Bahamas
{
  category: "Geography",
  question: "What is the capital of The Bahamas?",
  choices: ["Nassau", "Freeport", "Bridgetown", "George Town"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "Which bird, seen wading in large flocks in shallow lagoons, is the national bird of The Bahamas?",
  choices: ["Caribbean flamingo", "Frigatebird", "Roseate spoonbill", "Brown pelican"],
  answerIndex: 0,
  explain: "The West Indian (Caribbean) flamingo is the national bird of The Bahamas, seen in large flocks on islands like Great Inagua.",
},
{
  category: "Culture",
  question: "Junkanoo, a street parade of costumes, drums, cowbells, and horns, is held every Boxing Day and New Year's Day in which country?",
  choices: ["The Bahamas", "Jamaica", "Barbados", "Trinidad and Tobago"],
  answerIndex: 0,
  explain: "Junkanoo is The Bahamas' signature festival and music tradition, with roots going back centuries.",
},
{
  category: "Culture",
  question: "Bahamian actor Sidney Poitier made history in 1963 by becoming the first Black actor to do what?",
  choices: [
    "Win the Academy Award for Best Actor",
    "Direct a major Hollywood film",
    "Host the Academy Awards",
    "Win a Grammy Award",
  ],
  answerIndex: 0,
  explain: "Sidney Poitier won the Oscar for Best Actor for Lilies of the Field (1963).",
},

// Barbados
{
  category: "Geography",
  question: "What is the capital of Barbados?",
  choices: ["Bridgetown", "Nassau", "Castries", "Kingstown"],
  answerIndex: 0,
},
{
  category: "Culture",
  question: "Cou-cou and flying fish, a cornmeal-and-okra dish served with steamed fish, is the national dish of which country?",
  choices: ["Barbados", "Belize", "Guyana", "The Bahamas"],
  answerIndex: 0,
},
{
  category: "Culture",
  question: "In 2021, Barbados named its 11th National Hero — a global music and fashion icon. Who is it?",
  choices: ["Rihanna", "Nicki Minaj", "Grace Jones", "Shontelle"],
  answerIndex: 0,
  explain: "Rihanna (Robyn Rihanna Fenty) was named a National Hero of Barbados in 2021, the only living person to hold the honor.",
},
{
  category: "Culture",
  question: "What is Barbados' traditional fife-and-drum street music, blending British military band and African rhythmic traditions, called?",
  choices: ["Tuk band", "Bouyon", "Zouk", "Benna"],
  answerIndex: 0,
},

// Belize
{
  category: "Geography",
  question: "What is the capital of Belize? (Hint: it's not the country's largest city.)",
  choices: ["Belmopan", "Belize City", "San Ignacio", "Orange Walk"],
  answerIndex: 0,
  explain: "The capital moved from Belize City to Belmopan after Hurricane Hattie devastated the coast in 1961.",
},
{
  category: "Geography",
  question: "Belize's national animal, sometimes nicknamed the 'mountain cow,' is actually what kind of animal?",
  choices: ["A tapir", "A jaguar", "A manatee", "A peccary"],
  answerIndex: 0,
  explain: "Baird's tapir is Belize's national animal, despite its cow-like nickname.",
},
{
  category: "History",
  question: "Which language is the sole official language of Belize, making it unique in Central America?",
  choices: ["English", "Spanish", "French", "Dutch"],
  answerIndex: 0,
  explain: "Belize (formerly British Honduras) is the only Central American country with English as its official language, alongside widely spoken Belizean Kriol and Spanish.",
},
{
  category: "Culture",
  question: "Punta, a music and dance style strongly associated with Belize, originated with which people?",
  choices: ["The Garifuna", "The Maya", "The Taíno", "The Kalinago"],
  answerIndex: 0,
},

// Cuba
{
  category: "Geography",
  question: "The tocororo (Cuban trogon), Cuba's national bird, is notable for what feature?",
  choices: [
    "Its feathers match the colors of the Cuban flag",
    "It cannot be found anywhere except one mountain range",
    "It is the largest bird in the Caribbean",
    "It only sings once a year",
  ],
  answerIndex: 0,
  explain: "The tocororo's red, white, and blue plumage mirrors the Cuban flag, part of why it was chosen as a national symbol.",
},
{
  category: "Science",
  question: "In 1881, Cuban physician Carlos Finlay proposed that mosquitoes transmit which disease — a discovery later confirmed and used to help build the Panama Canal?",
  choices: ["Yellow fever", "Malaria", "Dengue fever", "Zika virus"],
  answerIndex: 0,
  explain: "Finlay's mosquito theory of yellow fever transmission was initially doubted but proved correct, transforming public health efforts across the tropics.",
},
{
  category: "Culture",
  question: "\"Son,\" the genre widely considered the direct ancestor of salsa music, originated in which country?",
  choices: ["Cuba", "Puerto Rico", "Dominican Republic", "Panama"],
  answerIndex: 0,
  explain: "Son cubano developed in eastern Cuba in the late 19th century and became the rhythmic foundation for salsa decades later.",
},

// Dominica
{
  category: "Geography",
  question: "What is the capital of Dominica?",
  choices: ["Roseau", "Portsmouth", "Marigot", "Castries"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "The critically endangered Sisserou parrot, found only in Dominica, appears on the country's what?",
  choices: ["National flag", "Currency only", "Passport cover only", "Coast guard flag"],
  answerIndex: 0,
  explain: "The Sisserou (Imperial amazon) parrot is Dominica's national bird and is featured on its national flag.",
},
{
  category: "Culture",
  question: "Bouyon, a fast-tempo music genre blending local folk styles with electronic instruments, originated in the 1980s in which country?",
  choices: ["Dominica", "Dominican Republic", "Grenada", "Saint Lucia"],
  answerIndex: 0,
},
{
  category: "History",
  question: "Dominica's Kalinago Territory holds what distinction in the Caribbean?",
  choices: [
    "It's the only officially recognized indigenous Carib (Kalinago) territory in the Caribbean",
    "It's the largest rainforest reserve in the Caribbean",
    "It's the only duty-free zone in the Eastern Caribbean",
    "It's the site of the Caribbean's oldest university",
  ],
  answerIndex: 0,
},

// Dominican Republic
{
  category: "Geography",
  question: "Santo Domingo, capital of the Dominican Republic, holds what distinction?",
  choices: [
    "It's the oldest continuously inhabited European-founded city in the Americas",
    "It's the highest-altitude capital in the Caribbean",
    "It was the first Caribbean capital to abolish slavery",
    "It's the only Caribbean capital not on a coastline",
  ],
  answerIndex: 0,
  explain: "Santo Domingo was founded in 1496, making it the oldest continuously inhabited city of European origin in the Americas.",
},
{
  category: "Geography",
  question: "The palmchat (cigua palmera), known for building giant communal nests in palm trees, is the national bird of which country?",
  choices: ["Dominican Republic", "Cuba", "Haiti", "Puerto Rico"],
  answerIndex: 0,
},
{
  category: "Culture",
  question: "Merengue and bachata, both recognized by UNESCO as Intangible Cultural Heritage, both originated in which country?",
  choices: ["Dominican Republic", "Cuba", "Puerto Rico", "Colombia"],
  answerIndex: 0,
},

// Grenada
{
  category: "Geography",
  question: "Grenada is nicknamed the \"Spice Isle\" because it's one of the world's leading producers of which spice?",
  choices: ["Nutmeg", "Cinnamon", "Vanilla", "Saffron"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "The Grenada dove, one of the most endangered doves in the world and found nowhere else on Earth, is Grenada's what?",
  choices: ["National bird", "National flower", "Coat of arms centerpiece only", "Unofficial mascot only"],
  answerIndex: 0,
},
{
  category: "Culture",
  question: "Sprinter Kirani James made history for Grenada at the 2012 London Olympics by doing what?",
  choices: [
    "Winning Grenada's first-ever Olympic medal (gold in the 400m)",
    "Becoming the youngest Olympic torch bearer",
    "Winning Grenada's first Olympic medal in swimming",
    "Setting a world record in the marathon",
  ],
  answerIndex: 0,
},

// Guyana
{
  category: "Geography",
  question: "The hoatzin, a bird whose chicks are born with claws on their wings, is a national symbol of which country?",
  choices: ["Guyana", "Suriname", "Belize", "Trinidad and Tobago"],
  answerIndex: 0,
  explain: "The hoatzin (also called the Canje pheasant) is one of Guyana's national birds, notable for its prehistoric-looking wing claws as a chick.",
},
{
  category: "Science",
  question: "Victoria amazonica, native to Guyana's rivers, is remarkable for being the world's largest what?",
  choices: ["Water lily", "Freshwater fish", "River crab", "Amphibian"],
  answerIndex: 0,
  explain: "Its enormous pads can grow wide enough to support the weight of a small child, and it's Guyana's national flower.",
},
{
  category: "Culture",
  question: "Pepperpot, a slow-cooked meat stew flavored with cassareep (a cassava-root reduction) and rooted in Amerindian cuisine, is a Christmas tradition in which country?",
  choices: ["Guyana", "Jamaica", "Belize", "Trinidad and Tobago"],
  answerIndex: 0,
},
{
  category: "History",
  question: "Guyana holds what distinction on the South American mainland?",
  choices: [
    "It's the only English-speaking country in mainland South America",
    "It's the only country in South America without a coastline",
    "It's the smallest country in South America",
    "It's the only country in South America entirely south of the equator",
  ],
  answerIndex: 0,
  explain: "Guyana, formerly British Guiana, is the only English-speaking country on the South American mainland.",
},

// Puerto Rico
{
  category: "Geography",
  question: "Puerto Rico's beloved unofficial symbol is a tiny tree frog named for its distinctive two-note call. What is it called?",
  choices: ["The coquí", "The crapaud", "The tocororo", "The sisserou"],
  answerIndex: 0,
  explain: "The coquí is found only in Puerto Rico and is famous for its \"ko-KEE\" call.",
},
{
  category: "Culture",
  question: "Mofongo — fried, mashed plantains typically mixed with garlic and pork cracklings — is an iconic dish of which territory?",
  choices: ["Puerto Rico", "Cuba", "Dominican Republic", "Jamaica"],
  answerIndex: 0,
},
{
  category: "Culture",
  question: "Baseball legend Roberto Clemente, the first Latin American player inducted into the Hall of Fame, died in 1972 while doing what?",
  choices: [
    "Personally delivering earthquake relief supplies to Nicaragua",
    "Playing in the World Series",
    "Coaching a youth baseball clinic",
    "Testing a new stadium",
  ],
  answerIndex: 0,
  explain: "Clemente's plane crashed off Puerto Rico while he was accompanying relief supplies for earthquake victims in Nicaragua.",
},
{
  category: "Culture",
  question: "Which music genre, now a global phenomenon, emerged from Puerto Rico's underground club scene in the 1990s?",
  choices: ["Reggaetón", "Merengue", "Zouk", "Dancehall"],
  answerIndex: 0,
},

// Saint Lucia
{
  category: "Geography",
  question: "What is the capital of Saint Lucia?",
  choices: ["Castries", "Vieux Fort", "Soufrière", "Gros Islet"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "The Saint Lucia parrot (locally called \"Jacquot\"), found only on the island, was declared what in 1979?",
  choices: ["The national bird", "The national animal", "A protected UNESCO species", "The national flower"],
  answerIndex: 0,
},
{
  category: "Culture",
  question: "Green fig and saltfish — unripe banana served with salted cod — is the national dish of which country?",
  choices: ["Saint Lucia", "Saint Vincent and the Grenadines", "Grenada", "Dominica"],
  answerIndex: 0,
},
{
  category: "History",
  question: "With economist Sir Arthur Lewis and poet Derek Walcott both born there, Saint Lucia holds a Guinness World Record for what?",
  choices: [
    "Most Nobel Prize laureates per capita of any country",
    "Most Olympic medals per capita",
    "Most languages spoken per capita",
    "Most UNESCO World Heritage Sites per capita",
  ],
  answerIndex: 0,
  explain: "Two Nobel laureates from an island of roughly 185,000 people is a genuinely exceptional record.",
},

// Saint Vincent and the Grenadines
{
  category: "Geography",
  question: "What is the capital of Saint Vincent and the Grenadines?",
  choices: ["Kingstown", "Kingston", "Castries", "Bridgetown"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "The Saint Vincent parrot, found only on the island, is which of the following?",
  choices: ["The national bird", "The national animal", "The national fish", "The national insect"],
  answerIndex: 0,
},
{
  category: "Science",
  question: "Founded in 1765, the Saint Vincent Botanic Gardens holds what distinction?",
  choices: [
    "It's the oldest botanical garden in the Western Hemisphere",
    "It's the largest rainforest reserve in the Caribbean",
    "It has the world's tallest palm tree",
    "It's the only garden in the world growing breadfruit",
  ],
  answerIndex: 0,
},
{
  category: "Culture",
  question: "Roasted breadfruit and fried jackfish is the national dish of which country?",
  choices: ["Saint Vincent and the Grenadines", "Saint Lucia", "Grenada", "Dominica"],
  answerIndex: 0,
},

// Suriname
{
  category: "Geography",
  question: "What is the capital of Suriname?",
  choices: ["Paramaribo", "Georgetown", "Cayenne", "Bridgetown"],
  answerIndex: 0,
},
{
  category: "History",
  question: "Surinamese writer and resistance fighter Anton de Kom, author of an influential anti-colonial history, died in 1945 in what circumstance?",
  choices: [
    "In a Nazi concentration camp, days before liberation",
    "Leading an armed uprising",
    "In exile in the Netherlands",
    "Shipwrecked returning to Suriname",
  ],
  answerIndex: 0,
  explain: "De Kom joined the Dutch resistance in WWII, was arrested by the Nazis, and died of tuberculosis at Camp Sandbostel just five days before the camp's liberation.",
},
{
  category: "Culture",
  question: "Pom — a baked casserole of chicken and pomtajer, a taro-like root — is a celebration dish from which country?",
  choices: ["Suriname", "Guyana", "Belize", "Dominican Republic"],
  answerIndex: 0,
},
{
  category: "History",
  question: "Suriname holds what linguistic distinction in South America?",
  choices: [
    "It's the only Dutch-speaking country in South America",
    "It's the only French-speaking country in South America",
    "It has no official language",
    "It's the only country in South America with two national languages",
  ],
  answerIndex: 0,
  explain: "Suriname's official language is Dutch, a legacy of Dutch colonization — though Sranan Tongo, an English-based creole, is a widely spoken lingua franca.",
},
{
  category: "Culture",
  question: "In Paramaribo, Suriname, a popular Sunday-morning tradition pits caged songbirds against each other in what kind of contest?",
  choices: ["A singing contest", "A racing contest", "A nest-building contest", "A feeding contest"],
  answerIndex: 0,
},

// Martinique & Guadeloupe
{
  category: "Science",
  question: "The 1902 eruption of Mount Pelée destroyed the city of Saint-Pierre in Martinique in minutes, killing roughly 30,000 people. What does this event hold the record for?",
  choices: [
    "The deadliest volcanic eruption of the 20th century",
    "The largest volcanic eruption ever recorded",
    "The first volcanic eruption ever documented",
    "The longest-lasting volcanic eruption in history",
  ],
  answerIndex: 0,
},
{
  category: "History",
  question: "Martinican poet and politician Aimé Césaire co-founded which influential literary and political movement?",
  choices: ["Négritude", "Pan-Africanism", "Rastafari", "Garveyism"],
  answerIndex: 0,
  explain: "Césaire co-founded Négritude alongside Léopold Sédar Senghor and Léon Damas, celebrating Black identity and culture in the face of colonialism.",
},
{
  category: "Culture",
  question: "Zouk, an upbeat dance music genre pioneered by the band Kassav', emerged in the early 1980s from which islands?",
  choices: ["Guadeloupe and Martinique", "Trinidad and Tobago", "Cuba and Puerto Rico", "Jamaica and Haiti"],
  answerIndex: 0,
},

// Aruba & Curaçao
{
  category: "History",
  question: "Papiamento, a creole blending Portuguese, Spanish, Dutch, English, and African influences, is a co-official language of which islands?",
  choices: ["Aruba and Curaçao", "Martinique and Guadeloupe", "Trinidad and Tobago", "The Bahamas"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "Willemstad, the capital of Curaçao, is a UNESCO World Heritage Site famous for what?",
  choices: [
    "Its rows of brightly painted Dutch colonial buildings",
    "Its ancient Taíno cave paintings",
    "Being the Caribbean's tallest lighthouse",
    "Its underground coral reef city",
  ],
  answerIndex: 0,
},

// Smaller territories
{
  category: "Science",
  question: "Montserrat's capital, Plymouth, has been abandoned and buried since 1995 because of what?",
  choices: [
    "Ongoing eruptions of the Soufrière Hills volcano",
    "Repeated hurricane flooding",
    "A major earthquake",
    "Rising sea levels",
  ],
  answerIndex: 0,
  explain: "Plymouth is still technically Montserrat's capital on paper, even though it's been uninhabitable for decades — government functions moved to Brades.",
},
{
  category: "Geography",
  question: "The Turks and Caicos Islands' coat of arms features a queen conch shell, a spiny lobster, and which distinctive plant?",
  choices: ["The Turk's Head cactus", "The breadfruit tree", "The royal palm", "The bougainvillea"],
  answerIndex: 0,
},
{
  category: "Culture",
  question: "Quelbe, an official traditional music style blending European quadrille, African rhythms, and satirical lyrics, was designated in 2003 by which territory?",
  choices: ["The U.S. Virgin Islands", "The British Virgin Islands", "The Cayman Islands", "Anguilla"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "The Cayman Islands are best known internationally as a major hub for which industry?",
  choices: ["Offshore banking and finance", "Coffee production", "Shipbuilding", "Textile manufacturing"],
  answerIndex: 0,
},

// Animals found only in the Caribbean
{
  category: "Science",
  question: "The solenodon, found only on Hispaniola and Cuba, is one of very few mammals on Earth with what unusual trait?",
  choices: ["A venomous bite", "The ability to fly", "A shell like a turtle", "Six legs"],
  answerIndex: 0,
  explain: "Solenodons deliver venom through grooved teeth — an extremely rare trait among mammals — and their lineage dates back tens of millions of years, essentially unchanged.",
},
{
  category: "Science",
  question: "One of the most endangered crocodile species on Earth survives naturally in only two small wetland habitats — a swamp and an island — both in the same country. Which one?",
  choices: ["Cuba", "Jamaica", "The Bahamas", "Trinidad and Tobago"],
  answerIndex: 0,
  explain: "Wild Cuban crocodiles are now found naturally only in Cuba's Zapata Swamp and on the Isle of Youth.",
},
{
  category: "Science",
  question: "Believed extinct for decades, the Jamaican iguana was rediscovered in 1990 in Jamaica's Hellshire Hills after being found by what?",
  choices: ["A hunter's dog", "A fisherman's net", "A hiking group", "A scientific expedition's camera trap"],
  answerIndex: 0,
  explain: "The Jamaican iguana had been considered extinct since the 1940s until a hog hunter's dog chased one into a hollow log in 1990.",
},
{
  category: "Science",
  question: "The West Indian manatee, found in coastal waters and rivers throughout the Caribbean, is most closely related to which land animal?",
  choices: ["The elephant", "The hippopotamus", "The seal", "The dolphin"],
  answerIndex: 0,
  explain: "Despite living entirely in water, manatees' closest living relatives are elephants, sharing a common ancestor from tens of millions of years ago.",
},
{
  category: "Science",
  question: "Caribbean anole lizards are famous among evolutionary biologists because on island after island...",
  choices: [
    "Similar sets of species evolved independently, a textbook example of repeated evolution",
    "They are the only lizards in the world capable of true flight",
    "They can survive fully submerged underwater for hours",
    "They grow larger than any other lizards on Earth",
  ],
  answerIndex: 0,
  explain: "Caribbean anoles are one of the best-studied examples anywhere of repeated, independent evolution producing similar species under similar conditions.",
},
{
  category: "Science",
  question: "The hutia, a large rodent found on islands like Cuba, Jamaica, and the Bahamas, is notable because several species...",
  choices: [
    "Are found nowhere else on Earth and some are critically endangered",
    "Can regenerate lost limbs",
    "Live exclusively underwater",
    "Are the smallest mammals in the world",
  ],
  answerIndex: 0,
},
{
  category: "Science",
  question: "Grande Riviere beach in Trinidad is one of the world's most important nesting sites for which giant marine reptile?",
  choices: ["The leatherback sea turtle", "The green sea turtle", "The saltwater crocodile", "The marine iguana"],
  answerIndex: 0,
  explain: "Trinidad's beaches host one of the densest concentrations of nesting leatherback turtles found anywhere in the world.",
},
{
  category: "Science",
  question: "The Trinidad piping-guan, locally called the \"pawi,\" is a critically endangered bird found only in...",
  choices: ["Trinidad's forests", "Jamaica's Blue Mountains", "Cuba's Zapata Swamp", "Haiti's La Selle range"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "Jamaica's national bird, nicknamed the \"doctor bird\" for its long tail streamers, is a type of what?",
  choices: ["Hummingbird", "Parrot", "Toucan", "Falcon"],
  answerIndex: 0,
  explain: "The red-billed streamertail is found only in Jamaica and is celebrated for its iridescent green plumage.",
},

// National flowers
{
  category: "Geography",
  question: "Declared in 1985, which plant is the national flower of Antigua and Barbuda?",
  choices: ["Dagger Log (Antigua agave)", "Bougainvillea", "Lignum Vitae", "Yellow Elder"],
  answerIndex: 0,
  explain: "The Dagger Log, a type of agave (century plant), was formally declared Antigua and Barbuda's national flower in 1985.",
},
{
  category: "Geography",
  question: "The Yellow Elder, a bright yellow flowering shrub, is the national flower of which country?",
  choices: ["The Bahamas", "Jamaica", "Saint Kitts and Nevis", "Barbados"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "This bright red-and-yellow flowering shrub, also called the Dwarf Poinciana, is the national flower of which country?",
  choices: ["Barbados", "Grenada", "Saint Lucia", "Trinidad and Tobago"],
  answerIndex: 0,
  explain: "Caesalpinia pulcherrima is commonly nicknamed the \"Pride of Barbados\" and is Barbados' national flower.",
},
{
  category: "Geography",
  question: "What is the national flower of Belize?",
  choices: ["The Black Orchid", "The Bougainvillea", "The Hibiscus", "The Poinciana"],
  answerIndex: 0,
  explain: "The Black Orchid was formally designated Belize's national flower by the National Symbols Act, 2025 — an actual act of parliament.",
},
{
  category: "Geography",
  question: "The mariposa (butterfly ginger lily) is recognized as which country's national flower?",
  choices: ["Cuba", "Dominican Republic", "Puerto Rico", "Jamaica"],
  answerIndex: 0,
  explain: "Cuba's mariposa was declared the national flower in 1936 by a commission of scientists and cultural figures; its white blossoms are also a traditional symbol of purity and independence.",
},
{
  category: "Geography",
  question: "What is the national flower of Dominica, sometimes called \"Carib Wood\"?",
  choices: ["Bwa Kwaib", "Bougainvillea", "Chaconia", "Yellow Elder"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "The Rosa de Bayahíbe became the Dominican Republic's official national flower in 2011, correcting a decree that had mistakenly named which plant instead?",
  choices: ["The mahogany flower", "The hibiscus", "The bougainvillea", "The orchid"],
  answerIndex: 0,
  explain: "A 1957 decree had named the mahogany flower as national flower; a 2011 law fixed the error, making mahogany the national tree and Rosa de Bayahíbe the national flower.",
},
{
  category: "Geography",
  question: "Bougainvillea, valued for its colorful bracts rather than true flowers, is the national flower of which spice-producing island?",
  choices: ["Grenada", "Saint Lucia", "Dominica", "Martinique"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "Lignum Vitae, prized for its extremely dense, durable wood, is the national flower of which country?",
  choices: ["Jamaica", "Cuba", "The Bahamas", "Trinidad and Tobago"],
  answerIndex: 0,
  explain: "Lignum Vitae (\"wood of life\") produces one of the densest woods in the world and was historically used for ship parts and tool bearings.",
},
{
  category: "Geography",
  question: "The Poinciana (Flamboyant tree), known for its brilliant red-orange blossoms, is the national flower of which country?",
  choices: ["Saint Kitts and Nevis", "Grenada", "Antigua and Barbuda", "Barbados"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "Uniquely, Saint Lucia recognizes two national flowers — the Rose and the Marguerite. What do they represent?",
  choices: [
    "Two rival flower festival societies on the island",
    "The island's two main political parties",
    "Saint Lucia's two largest towns",
    "The island's French and British colonial eras",
  ],
  answerIndex: 0,
  explain: "The Rose (La Rose) and the Marguerite (La Marguerite) societies each host an annual flower festival, and both flowers were chosen as national flowers in 1985.",
},
{
  category: "Geography",
  question: "The Soufriere Tree, named for the island's volcano, is the national flower of which country?",
  choices: ["Saint Vincent and the Grenadines", "Dominica", "Grenada", "Saint Lucia"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "The Chaconia (Warszewiczia coccinea), a fiery red forest flower, is the national flower of which country?",
  choices: ["Trinidad and Tobago", "Grenada", "Jamaica", "Barbados"],
  answerIndex: 0,
  explain: "The Chaconia is also nicknamed the \"Pride of Trinidad and Tobago.\"",
},

// National mottos
{
  category: "Geography",
  question: "\"Each Endeavouring, All Achieving\" is the national motto of which country?",
  choices: ["Antigua and Barbuda", "Saint Kitts and Nevis", "Trinidad and Tobago", "Barbados"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "The Bahamas' national motto, \"Forward, Upward, Onward, Together,\" was written by whom?",
  choices: [
    "Two 11-year-old schoolchildren who won a national competition",
    "The country's first Prime Minister",
    "A committee of university professors",
    "An anonymous poet",
  ],
  answerIndex: 0,
  explain: "Vivian F. Moultrie and Melvern B. Bowe, both 11 years old, won a national competition to craft the motto that appears on The Bahamas' coat of arms.",
},
{
  category: "Geography",
  question: "\"Pride and Industry\" is the national motto of which country?",
  choices: ["Barbados", "Jamaica", "Grenada", "Guyana"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "Belize's Latin national motto, \"Sub Umbra Floreo,\" translates to what?",
  choices: [
    "\"Under the Shade I Flourish\"",
    "\"Out of Many, One People\"",
    "\"Pride and Industry\"",
    "\"Peace and Justice\"",
  ],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "Dominica's national motto, \"Apres Bondie C'est La Ter\" (Antillean Creole), translates to what?",
  choices: [
    "\"After God Is the Earth\"",
    "\"Country Above Self\"",
    "\"Unity Makes Strength\"",
    "\"Justice, Piety, Fidelity\"",
  ],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "\"Dios, Patria, Libertad\" (\"God, Homeland, Liberty\") is the national motto of which country?",
  choices: ["Dominican Republic", "Cuba", "Haiti", "Puerto Rico"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "Which country's national motto is \"Ever Conscious of God We Aspire, Build and Advance as One People\"?",
  choices: ["Grenada", "Saint Lucia", "Saint Vincent and the Grenadines", "Dominica"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "Guyana's national motto, set out in its constitution, is which of the following?",
  choices: [
    "\"One People, One Nation, One Destiny\"",
    "\"Out of Many, One People\"",
    "\"Together We Aspire, Together We Achieve\"",
    "\"Country Above Self\"",
  ],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "Which motto appears on Haiti's coat of arms, above an image of cannons and a liberty cap?",
  choices: [
    "\"L'Union Fait La Force\" (Unity Makes Strength)",
    "\"Liberté, Égalité, Fraternité\"",
    "\"Dios, Patria, Libertad\"",
    "\"Sub Umbra Floreo\"",
  ],
  answerIndex: 0,
  explain: "\"L'Union Fait La Force\" appears on Haiti's coat of arms; the phrase \"Liberté, Égalité, Fraternité\" is also enshrined separately in Haiti's constitution.",
},
{
  category: "Geography",
  question: "\"Out of Many, One People\" is the national motto of which country?",
  choices: ["Jamaica", "Trinidad and Tobago", "Guyana", "Belize"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "\"Country Above Self\" is the national motto of which country?",
  choices: ["Saint Kitts and Nevis", "Antigua and Barbuda", "Dominica", "Barbados"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "\"The Land, The People, The Light\" — granted by royal warrant in 1979 — is the national motto of which country?",
  choices: ["Saint Lucia", "Saint Vincent and the Grenadines", "Grenada", "Dominica"],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "Saint Vincent and the Grenadines' national motto, \"Pax et Justitia,\" is in which language, and what does it mean?",
  choices: [
    "Latin, meaning \"Peace and Justice\"",
    "French, meaning \"Unity and Strength\"",
    "Latin, meaning \"Land and Sea\"",
    "Creole, meaning \"One People\"",
  ],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "Suriname's national motto, \"Justitia – Pietas – Fides,\" is Latin for what?",
  choices: [
    "\"Justice, Piety, Fidelity\"",
    "\"Freedom, Equality, Unity\"",
    "\"Peace, Progress, Prosperity\"",
    "\"One People, One Nation\"",
  ],
  answerIndex: 0,
},
{
  category: "Geography",
  question: "\"Together We Aspire, Together We Achieve\" is the national motto of which country?",
  choices: ["Trinidad and Tobago", "Jamaica", "Guyana", "Barbados"],
  answerIndex: 0,
}
];

function shuffle<T>(arr: T[]) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Randomizes the order of a single question's answer choices (and remaps
// answerIndex to match) so the correct answer doesn't always land in the
// same position. Question data in QUESTION_BANK is written with whatever
// choice order reads best in the source file — this is what actually
// decides what the player sees.
function shuffleChoices(q: TriviaQ): TriviaQ {
  const order = shuffle(q.choices.map((_, idx) => idx));
  return {
    ...q,
    choices: order.map((idx) => q.choices[idx]),
    answerIndex: order.indexOf(q.answerIndex),
  };
}

// ---- Score badges ----
// Tier thresholds are checked from the bottom up: the highest-min tier the
// score qualifies for wins. Colors are separate for on-page (Tailwind-ish
// hex) and canvas (drawn into the downloadable/shareable badge image). The
// tier data itself (thresholds, colors, copy, emoji) lives in
// lib/trivia-badges.ts, shared with the server-rendered OG image used for
// link previews, so the two generated images never drift apart.
const TIER_ICONS: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  learner: Sprout,
  explorer: Compass,
  scholar: BookOpen,
  master: Trophy,
};

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Draws a 1080x1080 shareable badge image and returns it as a PNG Blob.
async function buildBadgeImage(
  tier: BadgeTier,
  score: number,
  total: number
): Promise<Blob | null> {
  const size = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Background gradient in the tier's color
  const bgGrad = ctx.createLinearGradient(0, 0, size, size);
  bgGrad.addColorStop(0, tier.from);
  bgGrad.addColorStop(1, tier.to);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, size, size);

  // White "certificate" panel
  const pad = 64;
  ctx.save();
  ctx.shadowColor = "rgba(20,33,61,0.18)";
  ctx.shadowBlur = 50;
  ctx.shadowOffsetY = 22;
  roundRectPath(ctx, pad, pad, size - pad * 2, size - pad * 2, 56);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.restore();

  // Logo
  try {
    const logo = await loadImage("/InspiredLab.png");
    const logoSize = 92;
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, pad + 118, logoSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(
      logo,
      size / 2 - logoSize / 2,
      pad + 118 - logoSize / 2,
      logoSize,
      logoSize
    );
    ctx.restore();
  } catch {
    // logo failed to load — continue without it
  }

  ctx.textAlign = "center";

  ctx.fillStyle = "#14213D";
  ctx.font = "600 30px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.fillText("InspirED Lab Trivia Challenge", size / 2, pad + 118 + 46 + 34);

  // Big emoji "icon" badge circle
  const iconCenterY = pad + 118 + 46 + 34 + 150;
  const iconRadius = 112;
  ctx.beginPath();
  ctx.arc(size / 2, iconCenterY, iconRadius, 0, Math.PI * 2);
  ctx.fillStyle = tier.from;
  ctx.fill();
  ctx.font = "120px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText(tier.emoji, size / 2, iconCenterY + 8);
  ctx.textBaseline = "alphabetic";

  // Tier label
  ctx.fillStyle = tier.accent;
  ctx.font = "700 66px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.fillText(tier.label, size / 2, iconCenterY + iconRadius + 90);

  // Score
  ctx.fillStyle = "#14213D";
  ctx.font = "700 48px system-ui, -apple-system, Segoe UI, sans-serif";
  const scoreY = iconCenterY + iconRadius + 168;
  ctx.fillText(`${score} / ${total} correct`, size / 2, scoreY);

  // Decorative divider
  const dividerY = scoreY + 64;
  ctx.strokeStyle = tier.from;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(size / 2 - 90, dividerY);
  ctx.lineTo(size / 2 + 90, dividerY);
  ctx.stroke();

  // Footer
  ctx.fillStyle = "#46546F";
  ctx.font = "500 30px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.fillText("Think you can beat this?", size / 2, dividerY + 66);
  ctx.fillStyle = tier.accent;
  ctx.font = "700 32px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.fillText("inspiredlabskn.org", size / 2, dividerY + 112);

  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png"));
}

export function TriviaCard({ maxQuestions = 8 }: { maxQuestions?: number }) {
  const [round, setRound] = useState<TriviaQ[]>([]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [badgeUrl, setBadgeUrl] = useState<string | null>(null);
  const [badgeBlob, setBadgeBlob] = useState<Blob | null>(null);
  const [generatingBadge, setGeneratingBadge] = useState(false);
  const [canShareFiles, setCanShareFiles] = useState(false);

  useEffect(() => {
    setRound(shuffle(QUESTION_BANK).slice(0, maxQuestions).map(shuffleChoices));
    setI(0);
    setScore(0);
    setPicked(null);
    setDone(false);
  }, [maxQuestions]);

  // Feature-detect whether this browser can share image files (mobile Safari/
  // Chrome mostly) vs. only text/links (most desktop browsers).
  useEffect(() => {
    try {
      const probe = new File([""], "probe.png", { type: "image/png" });
      setCanShareFiles(
        typeof navigator !== "undefined" &&
          !!navigator.canShare &&
          navigator.canShare({ files: [probe] })
      );
    } catch {
      setCanShareFiles(false);
    }
  }, []);

  // Generate the shareable badge image once the round finishes.
  useEffect(() => {
    if (!done || round.length === 0) return;
    let cancelled = false;
    setGeneratingBadge(true);
    const tier = getBadgeTier(score, round.length);
    buildBadgeImage(tier, score, round.length).then((blob) => {
      if (cancelled) return;
      setGeneratingBadge(false);
      if (!blob) return;
      setBadgeBlob(blob);
      setBadgeUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  // Clean up the generated image URL when it changes or the component unmounts.
  useEffect(() => {
    return () => {
      if (badgeUrl) URL.revokeObjectURL(badgeUrl);
    };
  }, [badgeUrl]);

  if (round.length === 0) {
    return (
      <Card className="rounded-3xl">
        <CardContent className="p-6 sm:p-8">
          <div className="text-sm text-muted-foreground">Loading trivia...</div>
        </CardContent>
      </Card>
    );
  }

  const q = round[i];

  function choose(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answerIndex) setScore((s) => s + 1);
  }

  function next() {
    if (i + 1 >= round.length) {
      setDone(true);
      return;
    }
    setI((v) => v + 1);
    setPicked(null);
  }

  function restart() {
    setRound(shuffle(QUESTION_BANK).slice(0, maxQuestions).map(shuffleChoices));
    setI(0);
    setScore(0);
    setPicked(null);
    setDone(false);
    setBadgeBlob(null);
    setBadgeUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  }
  // Points at a dedicated results page (not the homepage) so that Facebook,
  // WhatsApp, etc. can show a link preview image matching this specific
  // score/tier — see app/trivia-result/page.tsx and app/api/og-badge.
  const resultPath = `/trivia-result?score=${score}&total=${round.length}`;
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${resultPath}`
      : resultPath;

  const shareText = `I scored ${score}/${round.length} on the InspirED Lab trivia challenge! Test your knowledge of Caribbean culture, history, and science.`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    } catch {
      console.log("Copy failed");
    }
  }

  async function getOrBuildBadgeBlob(): Promise<Blob | null> {
    if (badgeBlob) return badgeBlob;
    const tier = getBadgeTier(score, round.length);
    return buildBadgeImage(tier, score, round.length);
  }

  async function downloadBadge() {
    const blob = await getOrBuildBadgeBlob();
    if (!blob) return;
    const tier = getBadgeTier(score, round.length);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inspired-lab-trivia-${tier.key}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function shareBadge() {
    const blob = await getOrBuildBadgeBlob();
    if (!blob) return;
    const file = new File([blob], "inspired-lab-trivia-badge.png", {
      type: "image/png",
    });
    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "InspirED Lab Trivia",
          text: shareText,
        });
        return;
      }
    } catch {
      // user cancelled, or the platform rejected it — fall back to a download
    }
    await downloadBadge();
  }

  return (
    <Card className="rounded-3xl overflow-hidden border-[oklch(var(--brand-sky)/0.3)] shadow-md py-0 gap-0">
      {/* Colorful header banner */}
      <div className="bg-gradient-to-br from-[oklch(var(--brand-sky)/0.30)] via-[oklch(var(--brand-sky)/0.14)] to-white px-6 sm:px-8 pt-6 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary/80 uppercase tracking-wide">
              <Lightbulb className="h-4 w-4" />
              Trivia game
            </div>
            <div className="text-xl sm:text-2xl font-semibold text-primary mt-1">
              Test your knowledge!
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Answer {round.length} questions and earn a shareable badge 🏆
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-bold text-primary leading-none">{score}</div>
            <div className="text-xs text-muted-foreground mt-1">/ {round.length}</div>
          </div>
        </div>

        {!done ? (
          <div className="mt-4">
            <div className="h-2 rounded-full bg-white/70 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[oklch(var(--brand-sky))] to-[oklch(var(--brand-orange))] transition-all duration-300"
                style={{ width: `${(i / round.length) * 100}%` }}
              />
            </div>
            <div className="mt-1.5 text-xs text-muted-foreground">
              Question {i + 1} of {round.length}
            </div>
          </div>
        ) : null}
      </div>

      <CardContent className="space-y-4 p-6 sm:p-8">
        {done ? (
          (() => {
            const tier = getBadgeTier(score, round.length);
            const TierIcon = TIER_ICONS[tier.key] ?? Sprout;
            return (
              <div className="space-y-4">
                <div className="text-base">
                  You finished the round! Final score:{" "}
                  <span className="font-semibold">{score}</span>/{round.length}
                </div>

                {/* Earned badge preview */}
                <div
                  className="rounded-3xl border p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5"
                  style={{
                    background: `linear-gradient(135deg, ${tier.from}, ${tier.to})`,
                    borderColor: `${tier.accent}33`,
                  }}
                >
                  {badgeUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={badgeUrl}
                      alt={`${tier.label} badge`}
                      className="h-28 w-28 rounded-2xl shadow-sm bg-white object-contain flex-shrink-0"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-white/70 flex items-center justify-center flex-shrink-0">
                      <TierIcon className="h-10 w-10" style={{ color: tier.accent }} />
                    </div>
                  )}
                  <div className="text-center sm:text-left">
                    <div
                      className="text-xs font-medium uppercase tracking-wide"
                      style={{ color: tier.accent }}
                    >
                      Your badge
                    </div>
                    <div className="text-xl font-semibold" style={{ color: tier.accent }}>
                      {tier.label}
                    </div>
                    <div className="text-sm text-foreground/80 mt-1">{tier.blurb}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {canShareFiles ? (
                    <Button
                      className="rounded-2xl"
                      onClick={shareBadge}
                      disabled={generatingBadge}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share badge image
                    </Button>
                  ) : null}

                  <Button
                    variant={canShareFiles ? "outline" : "default"}
                    className="rounded-2xl"
                    onClick={downloadBadge}
                    disabled={generatingBadge}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download badge
                  </Button>

                  <Button asChild variant="outline" className="rounded-2xl">
                    <a
                      href={facebookShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="h-4 w-4 mr-2" />
                      Share on Facebook
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    className="rounded-2xl"
                    onClick={copyResult}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy result
                  </Button>

                  <Button onClick={restart} className="rounded-2xl">
                    Play again
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  For Instagram, TikTok, or texting a friend, use &ldquo;Share badge
                  image&rdquo; (or download it and attach it yourself) — Facebook&rsquo;s
                  button shares a link rather than the image itself.
                </div>
              </div>
            );
          })()
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="space-y-4"
            >
              <div
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: CATEGORY_STYLES[q.category].bg,
                  color: CATEGORY_STYLES[q.category].accent,
                }}
              >
                {q.category}
              </div>
              <div className="text-base font-medium">{q.question}</div>

              <div className="grid gap-2">
                {q.choices.map((c, idx) => {
                  const isCorrect = picked !== null && idx === q.answerIndex;
                  const isWrong =
                    picked !== null && idx === picked && picked !== q.answerIndex;
                  const isFaded = picked !== null && !isCorrect && !isWrong;

                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => choose(idx)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-left text-sm transition",
                        picked === null ? "hover:border-primary/40 hover:bg-muted" : "",
                        isCorrect ? "border-emerald-400 bg-emerald-50" : "",
                        isWrong ? "border-rose-400 bg-rose-50" : "",
                        isFaded ? "opacity-60" : ""
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                          isCorrect
                            ? "bg-emerald-500 text-white"
                            : isWrong
                              ? "bg-rose-500 text-white"
                              : "bg-muted text-muted-foreground"
                        )}
                      >
                        {isCorrect ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : isWrong ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          ANSWER_LETTERS[idx]
                        )}
                      </span>
                      <span className="flex-1">{c}</span>
                    </button>
                  );
                })}
              </div>

              {picked !== null && (
                <div className="rounded-2xl bg-[oklch(var(--brand-sky)/0.10)] p-3 text-sm">
                  <span className="font-medium">
                    {picked === q.answerIndex ? "Correct!" : "Not quite."}
                  </span>
                  {q.explain ? (
                    <div className="mt-1 text-muted-foreground">{q.explain}</div>
                  ) : null}
                </div>
              )}

              <div className="flex items-center justify-end pt-2">
                <Button
                  onClick={next}
                  className="rounded-2xl"
                  disabled={picked === null}
                >
                  {i + 1 >= round.length ? "See my badge" : "Next"}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </CardContent>
    </Card>
  );
}
