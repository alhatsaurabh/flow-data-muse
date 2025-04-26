import { getSearchableContent, SearchableContent, getBlogPosts, getCaseStudies } from './markdown'; // Import getBlogPosts and getCaseStudies

// Define a list of common English stop words
const stopWords = new Set([
  'a', 'an', 'the', 'is', 'are', 'and', 'or', 'in', 'on', 'at', 'for', 'with',
  'about', 'by', 'as', 'from', 'of', 'to', 'into', 'like', 'through', 'over',
  'under', 'above', 'below', 'up', 'down', 'out', 'off', 'then', 'than', 'this',
  'that', 'these', 'those', 'he', 'she', 'it', 'we', 'you', 'they', 'i', 'me',
  'him', 'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their',
  'mine', 'yours', 'hers', 'ours', 'theirs', 'be', 'been', 'am', 'is', 'are',
  'was', 'were', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
  'shall', 'should', 'can', 'could', 'may', 'might', 'must', 'go', 'goes',
  'went', 'gone', 'get', 'gets', 'got', 'gotten', 'make', 'makes', 'made',
  'making', 'see', 'sees', 'saw', 'seen', 'come', 'comes', 'came', 'coming',
  'take', 'takes', 'took', 'taken', 'put', 'puts', 'put', 'putting', 'give',
  'gives', 'gave', 'given', 'get', 'gets', 'got', 'gotten', 'find', 'finds',
  'found', 'finding', 'say', 'says', 'said', 'saying', 'tell', 'tells', 'told',
  'telling', 'ask', 'asks', 'asked', 'asking', 'work', 'works', 'worked',
  'working', 'use', 'uses', 'used', 'using', 'seem', 'seems', 'seemed',
  'seeming', 'feel', 'feels', 'felt', 'feeling', 'become', 'becomes', 'became',
  'becoming', 'leave', 'leaves', 'left', 'leaving', 'begin', 'begins',
  'began', 'beginning', 'end', 'ends', 'ended', 'ending', 'start', 'starts',
  'started', 'starting', 'stop', 'stops', 'stopped', 'stopping', 'continue',
  'continues', 'continued', 'continuing', 'write', 'writes', 'wrote',
  'written', 'read', 'reads', 'read', 'reading', 'learn', 'learns', 'learned',
  'learning', 'teach', 'teaches', 'taught', 'teaching', 'study', 'studies',
  'studied', 'studying', 'help', 'helps', 'helped', 'helping', 'thank',
  'thanks', 'thanked', 'thanking', 'please', 'welcome', 'sorry', 'excuse',
  'pardon', 'hello', 'hi', 'hey', 'goodbye', 'bye', 'see', 'later', 'talk',
  'soon', 'yes', 'no', 'ok', 'okay', 'sure', 'certainly', 'indeed', 'maybe',
  'perhaps', 'possibly', 'probably', 'always', 'usually', 'often', 'sometimes',
  'rarely', 'never', 'ever', 'just', 'only', 'even', 'very', 'much', 'more',
  'most', 'less', 'least', 'better', 'best', 'worse', 'worst', 'early', 'late',
  'soon', 'now', 'then', 'when', 'where', 'why', 'how', 'what', 'who', 'whom',
  'whose', 'which', 'while', 'whether', 'if', 'unless', 'until', 'because',
  'since', 'though', 'although', 'while', 'whereas', 'meanwhile', 'however',
  'therefore', 'thus', 'hence', 'consequently', 'accordingly', 'otherwise',
  'instead', 'rather', 'also', 'too', 'either', 'neither', 'nor', 'but', 'yet',
  'so', 'for', 'and', 'or', 'nor', 'not', 'don', 't', 'won', 'can', 'will',
  'just', 'should', 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren',
  'couldn', 'didn', 'doesn', 'hadn', 'hasn', 'haven', 'isn', 'ma', 'mightn',
  'mustn', 'needn', 'shan', 'shouldn', 'wasn', 'weren', 'won', 'wouldn'
]);


// Function to strip markdown syntax and tokenize text, removing stop words
function tokenizeAndFilter(text: string): string[] {
  // Strip markdown first
  let cleanedText = stripMarkdown(text);
  // Convert to lowercase and remove punctuation
  cleanedText = cleanedText.toLowerCase().replace(/[.,!?;:"'(){}[\]]/g, '');
  // Split into words and filter out stop words and empty strings
  return cleanedText.split(/\s+/).filter(word => word.length > 0 && !stopWords.has(word));
}

// Function to strip markdown syntax (keeping the previous one)
function stripMarkdown(markdown: string): string {
  // Remove common markdown syntax: headers, bold, italics, links, images, list markers
  let text = markdown.replace(/#+\s/g, ''); // Remove headers
  text = text.replace(/(\*\*|__)(.*?)\1/g, '$2'); // Remove bold
  text = text.replace(/(\*|_)(.*?)\1/g, '$2'); // Remove italics
  text = text.replace(/\[(.*?)\]\(.*?\)/g, '$1'); // Remove links, keep link text
  text = text.replace(/!\[(.*?)\]\(.*?\)/g, '$1'); // Remove images, keep alt text
  text = text.replace(/^- /gm, ''); // Remove list markers
  text = text.replace(/^\d+\. /gm, ''); // Remove ordered list markers
  text = text.replace(/`/g, ''); // Remove inline code backticks
  text = text.replace(/```[\s\S]*?```/g, ''); // Remove code blocks
  text = text.replace(/> /g, ''); // Remove blockquote markers
  text = text.replace(/---/g, ''); // Remove horizontal rules
  text = text.replace(/\n+/g, ' '); // Replace multiple newlines with a single space
  return text;
}

// Define a type for the chatbot response when content is found
interface ContentResponse {
  intro: string;
  items: {
    title: string;
    slug: string;
    type: 'blog' | 'case-study' | 'about';
    snippet: string;
  }[];
}

// Define a union type for the possible return types of answerQuestion
type ChatbotResponse = string | ContentResponse;


export async function answerQuestion(query: string): Promise<ChatbotResponse> { // Update return type
  const lowerQuery = query.toLowerCase();

  // Handle specific non-content questions
  if (lowerQuery.includes('your name')) {
    const nameResponses = [
      "I am Saurabh's virtual assistant, a chatbot designed to help you find information on this website.",
      "You're chatting with Saurabh's AI assistant.",
      "I'm a chatbot created to assist you on Saurabh's site."
    ];
    return nameResponses[Math.floor(Math.random() * nameResponses.length)];
  }
  if (lowerQuery.includes('contact you') || lowerQuery.includes('get in touch')) {
    const contactResponses = [
      "You can contact Saurabh through the contact form on the website or connect with him on LinkedIn. You can find the contact page in the navigation.",
      "To get in touch with Saurabh, please visit the contact page or find him on LinkedIn.",
      "Saurabh can be reached via the contact form or his LinkedIn profile."
    ];
    return contactResponses[Math.floor(Math.random() * contactResponses.length)];
  }
  if (lowerQuery.includes('hi') || lowerQuery.includes('hello') || lowerQuery.includes('hey')) {
    const greetings = [
      "Hi there! How can I help you find information on the website today?",
      "Hello! What can I assist you with today?",
      "Hey! Ask me anything about Saurabh or his work.",
      "Greetings! Ready to help you explore this site."
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // Handle specific suggested questions
  if (lowerQuery.includes("tell me about saurabh's experience") || lowerQuery.includes("tell me about saurabh's education") || lowerQuery.includes("what are saurabh's skills?")) {
    const aboutContent = (await getSearchableContent()).find(item => item.slug === 'about');
    if (aboutContent) {
      const aboutIntros = [
        "Here's some information about Saurabh:",
        "You can find details about Saurabh here:",
        "Check out this information about Saurabh:"
      ];
      return {
        intro: aboutIntros[Math.floor(Math.random() * aboutIntros.length)], // Randomly select an intro
        items: [{
          title: aboutContent.title,
          slug: aboutContent.slug,
          type: 'about',
          snippet: aboutContent.content.substring(0, 150) + '...'
        }]
      };
    } else {
      const notFoundAboutResponses = [
        "I couldn't find information about Saurabh at the moment.",
        "Details about Saurabh are not available right now.",
        "I'm unable to retrieve information about Saurabh at this time."
      ];
      return notFoundAboutResponses[Math.floor(Math.random() * notFoundAboutResponses.length)];
    }
  }

  if (lowerQuery.includes("what are the latest blog posts?")) {
    const blogPosts = await getBlogPosts();
    if (blogPosts.length > 0) {
      return {
        intro: "Here are some of the latest blog posts:",
        items: blogPosts.slice(0, 3).map(post => ({
          title: post.title,
          slug: post.slug,
          type: 'blog',
          snippet: post.excerpt || 'Click to read more.'
        }))
      };
    } else {
      return "I couldn't find any blog posts at the moment.";
    }
  }

  if (lowerQuery.includes("tell me about a case study")) {
    const caseStudies = await getCaseStudies();
    if (caseStudies.length > 0) {
      // Return a random case study for variety
      const randomCaseStudy = caseStudies[Math.floor(Math.random() * caseStudies.length)];
      return {
        intro: "Here's a case study you might find interesting:",
        items: [{
          title: randomCaseStudy.title,
          slug: randomCaseStudy.slug,
          type: 'case-study',
          snippet: randomCaseStudy.description || 'Click to read more.'
        }]
      };
    } else {
      return "I couldn't find any case studies at the moment.";
    }
  }

  const contentIndex = await getSearchableContent();
  console.log("Chatbot content index size:", contentIndex.length); // Log index size
  console.log("Chatbot content index:", contentIndex); // Log index content (for debugging)

  const queryTokens = tokenizeAndFilter(query);

  // Calculate relevance score for each content item
  const scoredContent = contentIndex.map(item => {
    // Tokenize different parts of the content
    const titleTokens = tokenizeAndFilter(item.title);
    const excerptDescriptionTokens = tokenizeAndFilter(`${item.excerpt || ''} ${item.description || ''}`);
    const tagsCategoryTokens = tokenizeAndFilter(`${item.tags?.join(' ') || ''} ${item.category || ''}`);
    const contentTokens = tokenizeAndFilter(item.content);

    let score = 0;

    // Score based on keyword matches with different weights
    queryTokens.forEach(queryToken => {
      if (item.type === 'about' && (titleTokens.includes(queryToken) || contentTokens.includes(queryToken))) {
         score += 7; // Higher weight for matches in About page content
      } else if (titleTokens.includes(queryToken)) {
        score += 5; // Higher weight for title matches
      } else if (tagsCategoryTokens.includes(queryToken)) {
        score += 3; // Medium weight for tags and category
      } else if (excerptDescriptionTokens.includes(queryToken)) {
        score += 2; // Lower weight for excerpt and description
      } else if (contentTokens.includes(queryToken)) {
        score += 1; // Lowest weight for content body
      }
    });

    return { item, score };
  });

  // Define a minimum score threshold (adjust as needed)
  const MIN_SCORE_THRESHOLD = 2; // Require a minimum score of 2

  // Filter out items with a score below the threshold and sort by score descending
  const relevantContent = scoredContent
    .filter(scoredItem => scoredItem.score >= MIN_SCORE_THRESHOLD) // Filter by threshold
    .sort((a, b) => b.score - a.score)
    .map(scoredItem => scoredItem.item); // Get back the original item

  if (relevantContent.length > 0) {
    // Return structured data for relevant content
    const intros = [
      "Here's some information I found:",
      "I found this that might help:",
      "Take a look at this:",
      "This content seems relevant:",
      "Here are a few relevant results:"
    ];
    return {
      intro: intros[Math.floor(Math.random() * intros.length)], // Randomly select an intro
      items: relevantContent.slice(0, 3).map(item => ({ // Limit to top 3 results
        title: item.title,
        slug: item.slug,
        type: item.type,
        snippet: item.type === 'blog' ? item.excerpt || 'Click to read more.' :
                 item.type === 'case-study' ? item.description || 'Click to read more.' :
                 item.content.substring(0, 150) + '...' // Snippet for about/cv
      }))
    };
  } else {
    const notFoundResponses = [
      "I couldn't find any information related to your query. Please try rephrasing your question.",
      "Hmm, I couldn't find anything matching that. Could you try asking in a different way?",
      "My apologies, I don't have information on that. Is there something else I can help you with?",
      "It seems I can't find an answer to that right now. Perhaps a different question?"
    ];
    return notFoundResponses[Math.floor(Math.random() * notFoundResponses.length)];
  }
}