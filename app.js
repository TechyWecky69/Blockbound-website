
const API = "https://api.mcstatus.io/v2/status/java/block-bound.org"; //temp
const IP = "block-bound.org"; // filler — replace when the real server IP is ready
const DISCORD_LINK = "https://discord.gg/blockbound"; // filler — replace with the real invite later

const groupNames = {
  START:"Start", MINING_T1:"Mining · Tier 1", MINING_T2:"Mining · Tier 2", MINING_T3:"Mining · Tier 3",
  FARMING_T1:"Farming · Tier 1", FARMING_T2:"Farming · Tier 2", FARMING_T3:"Farming · Tier 3",
  FISHING:"Fishing", NETHER_T1:"Nether · Tier 1", NETHER_T2:"Nether · Tier 2",
  END_T1:"End · Tier 1", END_T2:"End · Tier 2", ENCHANTING_T1:"Enchanting · Tier 1",
  ENCHANTING_T2:"Enchanting · Tier 2", ENCHANTING_T3:"Enchanting · Tier 3", BREWING:"Brewing",
  COLOUR:"Colour", FLOWERS_T1:"Flowers · Tier 1", FLOWERS_T2:"Flowers · Tier 2"
};

const fallbackItems = [
  "OAK_LOG","OAK_PLANKS","STICK","COBBLESTONE","STONE","DIRT","SAND","GRAVEL","OAK_SAPLING","WHEAT_SEEDS",
  "APPLE","FLINT","CHARCOAL","CRAFTING_TABLE","FURNACE","CHEST","TORCH","GLASS","LADDER","OAK_DOOR","OAK_FENCE",
  "OAK_FENCE_GATE","BOWL","STRING","BONE","ROTTEN_FLESH","GUNPOWDER","SPIDER_EYE","ARROW","WOODEN_SWORD",
  "WOODEN_AXE","WOODEN_PICKAXE","WOODEN_SHOVEL","WOODEN_HOE","STONE_SWORD","STONE_AXE","STONE_SHOVEL","STONE_HOE",
  "LEATHER_HELMET","LEATHER_CHESTPLATE","LEATHER_LEGGINGS","LEATHER_BOOTS","ANDESITE","DIORITE","GRANITE","COAL",
  "COPPER","TUFF","CALCITE","DRIPSTONE","SANDSTONE","RAW_COPPER","COPPER_INGOT","IRON_INGOT","IRON_ORE","RAW_IRON",
  "RAW_GOLD","GOLD_INGOT","GOLD_ORE","REDSTONE","REDSTONE_BLOCK","LAPIS_LAZULI","LAPIS_BLOCK","BLAST_FURNACE",
  "DEEPSLATE","COBBLED_DEEPSLATE","CHISELED_DEEPSLATE","IRON_PICKAXE","IRON_SWORD","IRON_AXE","IRON_SHOVEL",
  "IRON_HOE","IRON_HELMET","IRON_CHESTPLATE","IRON_LEGGINGS","IRON_BOOTS","DIAMOND","DIAMOND_ORE",
  "DEEPSLATE_DIAMOND_ORE","LAVA_BUCKET","AMETHYST_SHARD","AMETHYST_BLOCK","OBSIDIAN","DIAMOND_PICKAXE",
  "DIAMOND_SWORD","DIAMOND_AXE","DIAMOND_SHOVEL","DIAMOND_HOE","DIAMOND_HELMET","DIAMOND_CHESTPLATE",
  "DIAMOND_LEGGINGS","DIAMOND_BOOTS","WHEAT","CARROT","POTATO","BEETROOT","BEETROOT_SEEDS","BREAD","SWEET_BERRIES",
  "GLOW_BERRIES","COCOA_BEANS","BONE_MEAL","SHEARS","BUCKET","WATER_BUCKET","MILK_BUCKET","LEAD","NAME_TAG","COMPASS",
  "GOLDEN_APPLE","GOLDEN_CARROT","GLISTERING_MELON_SLICE","PUMPKIN_PIE","CAKE","COOKIE","SUSPICIOUS_STEW",
  "MUSHROOM_STEW","RABBIT_STEW","HONEY_BOTTLE","HONEYCOMB","BEEHIVE","BEE_NEST","BEEF","COOKED_BEEF","PORKCHOP",
  "COOKED_PORKCHOP","CHICKEN","COOKED_CHICKEN","MUTTON","COOKED_MUTTON","RABBIT","COOKED_RABBIT","COD","COOKED_COD",
  "SALMON","COOKED_SALMON","TROPICAL_FISH","PUFFERFISH","LEATHER","FEATHER","RABBIT_HIDE","RABBIT_FOOT","EGG",
  "FISHING_ROD","BOW","ENCHANTED_BOOK","NAUTILUS_SHELL","HEART_OF_THE_SEA","LILY_PAD","TRIPWIRE_HOOK","SADDLE",
  "NETHERRACK","NETHER_QUARTZ_ORE","NETHER_GOLD_ORE","SOUL_SAND","SOUL_SOIL","BASALT","BLACKSTONE","GLOWSTONE",
  "MAGMA_BLOCK","NETHER_WART","NETHER_BRICKS","NETHER_BRICK","NETHER_BRICK_SLAB","NETHER_BRICK_STAIRS",
  "NETHER_BRICK_FENCE","NETHER_BRICK_WALL","CRIMSON_STEM","WARPED_STEM","CRIMSON_PLANKS","WARPED_PLANKS",
  "CRIMSON_FUNGUS","WARPED_FUNGUS","BLAZE_ROD","BLAZE_POWDER","GHAST_TEAR","WITHER_SKELETON_SKULL","NETHER_STAR",
  "PIGLIN_BANNER_PATTERN","SNOUT_ARMOR_TRIM_SMITHING_TEMPLATE","NETHERITE_SCRAP","NETHERITE_INGOT","NETHERITE_PICKAXE",
  "NETHERITE_AXE","NETHERITE_SHOVEL","NETHERITE_HOE","NETHERITE_SWORD","NETHERITE_HELMET","NETHERITE_CHESTPLATE",
  "NETHERITE_LEGGINGS","NETHERITE_BOOTS","ANCIENT_DEBRIS","RESPAWN_ANCHOR","LODESTONE","CRYING_OBSIDIAN",
  "MAGMA_CREAM","END_STONE","END_STONE_BRICKS","CHORUS_FRUIT","CHORUS_FLOWER","CHORUS_PLANT","END_ROD",
  "ENDER_PEARL","ENDER_EYE","PURPUR_BLOCK","PURPUR_PILLAR","PURPUR_SLAB","PURPUR_STAIRS","END_CRYSTAL","ELYTRA",
  "SHULKER_SHELL","SHULKER_BOX","DRAGON_BREATH","DRAGON_EGG","END_CITY","EMERALD","ENDER_CHEST","ENCHANTING_TABLE",
  "BOOK","BOOKSHELF","WRITABLE_BOOK","WRITTEN_BOOK","EXPERIENCE_BOTTLE","GRINDSTONE","ANVIL","LECTERN","QUILL",
  "BREWING_STAND","GLASS_BOTTLE","CAULDRON","FERMENTED_SPIDER_EYE","SUGAR","REDSTONE","GLOWSTONE_DUST",
  "SPIDER_EYE","PHANTOM_MEMBRANE","TURTLE_HELMET","TURTLE_SCUTE","SLIME_BALL","POTION","SPLASH_POTION",
  "LINGERING_POTION","DANDELION","POPPY","ALLIUM","AZURE_BLUET","RED_TULIP","ORANGE_TULIP","WHITE_TULIP",
  "PINK_TULIP","OXEYE_DAISY","CORNFLOWER","SUNFLOWER","LILY_OF_THE_VALLEY","BLUE_ORCHID","CHERRY_LEAVES",
  "FLOWERING_AZALEA_LEAVES","MANGROVE_PROPAGULE","FLOWERING_AZALEA","TORCHFLOWER","WITHER_ROSE","PINK_PETALS",
  "SPORE_BLOSSOM","LILAC","ROSE_BUSH","PEONY","PITCHER_PLANT","MENDING","ELYTRA","TOTEM_OF_UNDYING","SPYGLASS",
  "GOAT_HORN","FIREWORK_ROCKET","FIREWORK_STAR","ARMOR_STAND","CLOCK","RECOVERY_COMPASS"
];

let allItems = [...new Set(fallbackItems)];
const rules = window.BLOCKBOUND_REGISTRY;

function title(id){ return id.toLowerCase().split("_").map(x=>x[0]?.toUpperCase()+x.slice(1)).join(" "); }
function matches(id, group){
  const e = rules.explicit[group] || [], p = rules.prefixes[group] || [], s = rules.suffixes[group] || [];
  return e.includes(id) || p.some(x=>id.startsWith(x)) || s.some(x=>id.endsWith(x));
}
function groupsFor(id){ return Object.keys(groupNames).filter(g=>matches(id,g)); }
function buildGroups(){ 
  const out={}; 
  Object.keys(groupNames).forEach(g=>out[g]=allItems.filter(i=>matches(i,g)));
  return out;
}
function rarityScore(id){
  const groups=groupsFor(id);
  // More source groups = more common/accessible in the registry; deterministic tie-breaker.
  return groups.length ? groups.length : 0;
}
function sortedGroups(id){
  return groupsFor(id).sort((a,b)=>rarityScore(id)-rarityScore(id) || groupNames[a].localeCompare(groupNames[b]));
}
async function updateStatus(){
  try{
    const r=await fetch(API,{cache:"no-store"});
    const d=await r.json();
    const online=!!d.online, count=d.players?.online ?? 0, max=d.players?.max ?? 0;
    document.querySelector("#header-status").textContent=online?`${count} player${count===1?"":"s"} online`:"Server offline";
    const c=document.querySelector("#player-count"); if(c)c.innerHTML=`${count}<span> / ${max || "?"}</span>`;
    const b=document.querySelector("#player-bar"); if(b)b.style.width=max?`${Math.min(100,count/max*100)}%`:"0%";
    const pill=document.querySelector("#online-pill"); if(pill){pill.textContent=online?"ONLINE":"OFFLINE";pill.style.color=online?"#65e2bc":"#ff7a88"}
  }catch(e){
    const el=document.querySelector("#header-status"); if(el)el.textContent="Status unavailable";
    const c=document.querySelector("#player-count"); if(c)c.innerHTML=`—<span> / —</span>`;
  }
}
async function copyText(text, button, successText){
  try{
    await navigator.clipboard.writeText(text);
    if(button){
      const old=button.textContent;
      button.textContent=successText;
      setTimeout(()=>button.textContent=old,1400);
    }
  }catch(e){
    if(button){
      const old=button.textContent;
      button.textContent="Copy failed";
      setTimeout(()=>button.textContent=old,1400);
    }
  }
}
function copyDiscord(){
  const b=document.querySelector("#discord-button");
  copyText(DISCORD_LINK,b,"Copied!");
}
function updateDiscordDisplay(){
  const el=document.querySelector("#discord-link-text");
  if(!el)return;
  try{ el.textContent=DISCORD_LINK.replace(/^https?:\/\//,""); }catch(_){ el.textContent=DISCORD_LINK; }
}
function copyIP(){
  navigator.clipboard?.writeText(IP);
  const b=document.querySelector("#copy-ip"); if(!b)return;
  const old=b.textContent;b.textContent="Copied!";setTimeout(()=>b.textContent=old,1200);
}
function docs(){
 const groups=buildGroups();
 return `<section class="page"><div class="page-head"><div class="eyebrow">Knowledge base</div><h1>Item documentation</h1><p>Search the BlockBound registry or open a group below. Every item is clickable, so you can jump from a group straight to its item page.</p></div>
 <div class="search-wrap"><span class="search-icon">⌕</span><input id="item-search" autocomplete="off" placeholder="Search items… e.g. Diamond, Enchanted Book, Elytra"></div><div class="search-results" id="search-results"></div>
 <div class="notice"><strong>Registry note:</strong> groups below mirror the supplied BlockBound <code>buildGroups()</code> rules. Prefix/suffix groups are resolved against the catalogue bundled with this website; add the rest of your server's Minecraft materials to <code>fallbackItems</code> to expose every matching material.</div>
 <div class="groups">${Object.entries(groups).map(([g,items])=>`<details class="group"><summary><span>${groupNames[g]}</span><span class="group-meta">${items.length} items</span></summary><div class="items">${items.length?items.map(i=>`<button class="item-chip" data-item="${i}">${title(i)}</button>`).join(""):`<span style="color:#697586;padding:17px 0;font-size:13px">No static items in this group.</span>`}</div></details>`).join("")}</div></section>`;
}
function itemPage(id){
 const groups=sortedGroups(id);
 return `<section class="page item-page"><a class="back" href="#/docs">← Back to documentation</a>
 <div class="item-hero"><div class="item-id">MINECRAFT ITEM</div><h1 class="item-title">${title(id)}</h1><p class="item-description">Registry ID: <code>${id}</code>. This page shows the BlockBound groups that can contain this item, ordered by the number of registry matches for the item.</p>
 <h3>Available from</h3><div class="group-list">${groups.length?groups.map((g,i)=>`<a class="group-link" href="#/docs"><span><strong>${groupNames[g]}</strong><br><small style="color:#718091">${(buildGroups()[g]||[]).length} catalogue items</small></span><span class="rank">#${i+1}</span></a>`).join(""):`<div class="empty">This item is not currently matched by the supplied registry rules.</div>`}</div></div></section>`;
}
async function render(){
 const app=document.querySelector("#app"); const hash=location.hash.slice(1)||"/";
 // Documentation is the only page — every other hash normalises to it.
 if(hash.startsWith("/item/")){
   app.innerHTML=itemPage(decodeURIComponent(hash.slice(6)));
 } else if(hash==="/docs"){
   app.innerHTML=docs();
 } else {
   location.hash="#/docs";
   return;
 }

 if(hash==="/docs"){
   const input=document.querySelector("#item-search"), results=document.querySelector("#search-results");
   input.addEventListener("input",()=>{
     const q=input.value.trim().toLowerCase();
     if(!q){results.style.display="none";results.innerHTML="";return}
     const found=allItems.filter(i=>title(i).toLowerCase().includes(q)||i.toLowerCase().includes(q)).slice(0,12);
     results.innerHTML=found.length?found.map(i=>`<div class="result" data-result="${i}"><div><div class="result-name">${title(i)}</div><div class="result-groups">${groupsFor(i).map(g=>groupNames[g]).join(" · ")||"No matching group"}</div></div><span class="result-rarity">${groupsFor(i).length} group${groupsFor(i).length===1?"":"s"}</span></div>`).join(""):`<div class="empty">No items found.</div>`;
     results.style.display="block";
   });
   document.querySelectorAll(".item-chip").forEach(b=>b.onclick=()=>location.hash="#/item/"+encodeURIComponent(b.dataset.item));
 }
 const ipText=document.querySelector("#server-ip-text"); if(ipText)ipText.textContent=IP;
 document.querySelector("#copy-ip")?.addEventListener("click",copyIP);
 document.querySelector("#discord-button")?.addEventListener("click",copyDiscord);
 updateDiscordDisplay();
 updateStatus();
}

function searchDelegation(e){
 const r=e.target.closest("[data-result]"); if(r)location.hash="#/item/"+encodeURIComponent(r.dataset.result);
}
// Global search-result click delegation — always active so it survives re-renders
document.addEventListener("click", searchDelegation);
window.addEventListener("hashchange",()=>render()); render(); setInterval(updateStatus,30000);
