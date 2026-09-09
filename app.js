
const API = "https://api.mcstatus.io/v2/status/java/demo.mcstatus.io";
const IP = "play.blockbound.example"; // filler — replace when the real server IP is ready
const DISCORD_LINK = "https://discord.gg/blockbound"; // filler — replace with the real invite later
const STORE_API = (window.BLOCKBOUND_CONFIG?.storeApi || "").replace(/\/$/, "");

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

const RANKS = {
  VIP: {name:"VIP", price:"£2.99", tag:"Starter rank", desc:"A low-cost upgrade for players who want a little more from BlockBound.", features:["VIP rank in-game","VIP chat styling","Access to VIP perks"]},
  MVP: {name:"MVP", price:"£5.99", tag:"Best value", desc:"The sweet spot for players who want the full permanent rank upgrade.", features:["Everything in VIP","MVP rank in-game","Extra MVP perks","Higher priority than VIP"]},
};
const MVPPLUS = [
  ["1 week","£2.49"],["1 month","£6.99"],["3 months","£17.99"],["6 months","£29.99"],["1 year","£49.99"]
];

function apiUrl(path){ return STORE_API + path; }
async function apiFetch(path, options={}){
  const opts={...options,credentials:"include",headers:{"Content-Type":"application/json",...(options.headers||{})}};
  const r=await fetch(apiUrl(path),opts);
  let d={}; try{d=await r.json()}catch(_){}
  if(!r.ok) throw new Error(d.error||"Request failed");
  return d;
}
let currentAccount=null;
async function loadAccount(){
  try{ const d=await apiFetch("/api/auth/me"); currentAccount=d.account||null; }
  catch(_){ currentAccount=null; }
  return currentAccount;
}
function escapeHtml(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));}

function authModal(mode="login", after=null){
  const isLogin=mode==="login";
  document.body.insertAdjacentHTML("beforeend",`<div class="modal-backdrop" id="auth-modal"><div class="modal">
  <button class="modal-close" id="auth-close">×</button>
  <div class="eyebrow">${isLogin?"Account":"Create account"}</div><h2>${isLogin?"Log in to BlockBound":"Create your BlockBound account"}</h2>
  <form class="auth-form" id="auth-form">
   ${!isLogin?'<label>Username<input name="username" minlength="3" maxlength="24" required autocomplete="username"></label>':''}
   <label>Email<input type="email" name="email" maxlength="160" required autocomplete="email"></label>
   <label>Password<input type="password" name="password" minlength="8" required autocomplete="${isLogin?"current-password":"new-password"}"></label>
   ${isLogin?'<label class="remember"><input type="checkbox" name="remember"> Remember me</label>':''}
   <button class="button auth-submit" type="submit">${isLogin?"Log in":"Create account"}</button>
  </form><div class="auth-notice" id="auth-msg" style="display:none"></div>
  <p class="auth-switch">${isLogin?'Need an account? <a href="#" id="switch-auth">Create one</a>':'Already have an account? <a href="#" id="switch-auth">Log in</a>'}</p>
  </div></div>`);
  const modal=document.querySelector("#auth-modal");
  document.querySelector("#auth-close").onclick=()=>modal.remove();
  document.querySelector("#switch-auth").onclick=e=>{e.preventDefault();modal.remove();authModal(isLogin?"register":"login",after)};
  document.querySelector("#auth-form").onsubmit=async e=>{
    e.preventDefault(); const form=new FormData(e.target), msg=document.querySelector("#auth-msg");
    msg.style.display="block"; msg.dataset.state=""; msg.textContent="Working…";
    try{
      const d=await apiFetch(isLogin?"/api/auth/login":"/api/auth/register",{method:"POST",body:JSON.stringify(Object.fromEntries(form))});
      currentAccount=d.account; modal.remove(); await render(); if(after)after();
    }catch(err){msg.dataset.state="error";msg.textContent=err.message}
  };
}

function store(){
 const connection = currentAccount ? `<div class="account-card" style="margin-bottom:22px"><h2>Account connections</h2>
 <div class="account-status"><span>${currentAccount.minecraft?`<span class="status-dot"></span>${escapeHtml(currentAccount.minecraft.name)}`:"Minecraft not linked"}</span>${currentAccount.minecraft?'<button class="button" id="store-unlink-minecraft">Unlink</button>':'<button class="button" id="store-link-minecraft">Link Minecraft</button>'}</div>
 ${currentAccount.minecraft?'<div class="store-lock">Linked Minecraft accounts are used to check your current <code>ranks</code> before every purchase.</div>':'<div class="store-lock">Click <strong>Link Minecraft</strong> to generate a six-character code, then run <code>/linkstore &lt;code&gt;</code> in-game.</div><div id="store-link-code"></div>'}
 <div class="account-status"><span>${currentAccount.discord?.tag?`<span class="status-dot"></span>${escapeHtml(currentAccount.discord.tag)}`:"Discord not linked"}</span>${currentAccount.discord?'<button class="button" id="store-unlink-discord">Unlink</button>':'<button class="button" id="store-link-discord">Link Discord</button>'}</div>
 </div>` : `<div class="notice"><strong>Not logged in.</strong> You can browse the store, but a purchase requires a logged-in account with a linked Minecraft account. <button class="button" id="store-login">Log in</button></div>`;
 return `<section class="page"><div class="store-hero"><div class="eyebrow">BlockBound Store</div><h1>Upgrade your island experience.</h1><p>Choose a permanent rank or an MVP+ subscription. Your Minecraft account must be linked to your BlockBound account before a purchase can be started.</p></div>
 ${connection}
 <div class="rank-grid">
 ${["VIP","MVP"].map(k=>{let r=RANKS[k];return `<article class="rank-card ${k==="MVP"?"featured":""}"><span class="tag">${r.tag}</span><h2>${r.name}</h2><p class="rank-desc">${r.desc}</p><ul class="rank-features">${r.features.map(x=>`<li>${x}</li>`).join("")}</ul><div class="rank-price">${r.price}<small style="font-size:12px;color:#718091;font-weight:500"> one-time</small></div><button class="button buy-rank" data-rank="${k}">Buy ${k}</button></article>`}).join("")}
 </div>
 <div class="subscription-section"><h2>MVP+</h2><p>MVP+ is a subscription-style rank. You must already own MVP before starting an MVP+ term.</p><div class="subscription-grid">${MVPPLUS.map(([term,price],i)=>`<article class="subscription-option ${i===1?"popular":""}"><h3>${term}</h3><div class="small">${i===1?"Most popular":"MVP+ subscription"}</div><div class="sub-price">${price}</div><button class="button buy-rank" data-rank="MVP+" data-term="${term}">Choose</button></article>`).join("")}</div></div>
 <div class="notice" style="margin-top:25px"><strong>Purchase rules:</strong> VIP cannot be bought once MVP is owned. MVP cannot be repurchased. MVP+ requires an existing MVP. Higher ranks are never replaced by lower ranks.</div>
 </section>`;
}

function accountPage(){
 if(!currentAccount) return `<section class="page"><div class="page-head"><div class="eyebrow">Account</div><h1>BlockBound account</h1><p>Log in to manage your Minecraft and Discord links.</p></div><div class="login-required"><button class="button" id="account-login">Log in</button></div></section>`;
 const mc=currentAccount.minecraft;
 return `<section class="page"><div class="page-head"><div class="eyebrow">Account</div><h1>${escapeHtml(currentAccount.username)}</h1><p>Manage your account connections and store eligibility.</p></div>
 <div class="account-grid"><div class="account-card"><h2>Minecraft</h2><div class="account-status"><span>${mc?`<span class="status-dot"></span>${escapeHtml(mc.name)}`:"Not linked"}</span><span style="color:${mc?"#65e2bc":"#ffb86b"}">${mc?"Linked":"Unlinked"}</span></div>
 ${mc?`<div class="account-actions"><button class="button" id="unlink-store">Unlink Minecraft</button></div>`:`<button class="button" id="link-minecraft">Link Minecraft</button><div id="link-code-area"></div>`}</div>
 <div class="account-card"><h2>Discord</h2><div class="account-status"><span>${currentAccount.discord?.tag?`<span class="status-dot"></span>${escapeHtml(currentAccount.discord.tag)}`:"Not linked"}</span><span style="color:${currentAccount.discord?"#65e2bc":"#ffb86b"}">${currentAccount.discord?"Linked":"Unlinked"}</span></div>
 ${currentAccount.discord?'<button class="button" id="unlink-discord">Unlink Discord</button>':'<button class="button" id="link-discord">Link Discord</button>'}</div></div>
 <div class="social-reward-card"><div><div class="eyebrow">Link rewards</div><h2>Connect your BlockBound accounts</h2><p>Link your Discord and Minecraft/website accounts for a one-time <strong>10 Tree Token</strong> reward for each connection.</p></div><div class="social-reward-badges"><span>Discord · +10</span><span>Website · +10</span></div></div>
 <div class="account-actions" style="margin-top:18px"><button class="button" id="logout">Log out</button><a class="button" href="#/store">Open store</a></div></section>`;
}
function startDiscordLink(){
 if(!currentAccount){authModal("login",()=>startDiscordLink());return}
 window.location.href=apiUrl("/api/discord/start");
}
async function generateStoreCode(){
 try{
   const d=await apiFetch("/api/linkstore/code",{method:"POST"});
   const area=document.querySelector("#link-code-area");
   if(area) area.innerHTML=`<div class="store-lock">Run <code>/linkstore ${escapeHtml(d.code)}</code> in Minecraft within ${d.expires_in_minutes} minutes.</div><div class="code-box">${escapeHtml(d.code)}</div>`;
 }catch(e){alert(e.message)}
}
async function buyRank(rank,term){
 if(!currentAccount){authModal("login",()=>buyRank(rank,term));return}
 if(!currentAccount.minecraft){alert("You must link a Minecraft account before buying a rank.");location.hash="#/account";return}
 try{
   const d=await apiFetch("/api/purchase",{method:"POST",body:JSON.stringify({rank,term})});
   if(d.checkout_url) location.href=d.checkout_url;
   else alert(d.message||"Your purchase request was created. Complete checkout to receive the rank.");
 }catch(e){alert(e.message)}
}
async function render(){
 const app=document.querySelector("#app"); const hash=location.hash.slice(1)||"/docs";
 await loadAccount();
 if(hash.startsWith("/item/")) app.innerHTML=itemPage(decodeURIComponent(hash.slice(6)));
 else if(hash==="/docs") app.innerHTML=docs();
 else if(hash==="/store") app.innerHTML=store();
 else if(hash==="/account") app.innerHTML=accountPage();
 else {location.hash="#/docs";return}
 if(hash==="/docs"){
  const input=document.querySelector("#item-search"),results=document.querySelector("#search-results");
  input?.addEventListener("input",()=>{const q=input.value.trim().toLowerCase();if(!q){results.style.display="none";results.innerHTML="";return}const found=allItems.filter(i=>title(i).toLowerCase().includes(q)||i.toLowerCase().includes(q)).slice(0,12);results.innerHTML=found.length?found.map(i=>`<div class="result" data-result="${i}"><div><div class="result-name">${title(i)}</div><div class="result-groups">${groupsFor(i).map(g=>groupNames[g]).join(" · ")||"No matching group"}</div></div><span class="result-rarity">${groupsFor(i).length} group${groupsFor(i).length===1?"":"s"}</span></div>`).join(""):`<div class="empty">No items found.</div>`;results.style.display="block"});
  document.querySelectorAll(".item-chip").forEach(b=>b.onclick=()=>location.hash="#/item/"+encodeURIComponent(b.dataset.item));
 }
 document.querySelectorAll(".buy-rank").forEach(b=>b.onclick=()=>buyRank(b.dataset.rank,b.dataset.term));
 document.querySelector("#account-login")?.addEventListener("click",()=>authModal("login"));
 document.querySelector("#store-login")?.addEventListener("click",()=>authModal("login",()=>render()));
 document.querySelector("#store-link-discord")?.addEventListener("click",startDiscordLink);
 document.querySelector("#link-discord")?.addEventListener("click",startDiscordLink);
 document.querySelector("#store-link-minecraft")?.addEventListener("click",async()=>{
   try{const d=await apiFetch("/api/linkstore/code",{method:"POST"});const a=document.querySelector("#store-link-code");if(a)a.innerHTML=`<div class="code-box">${escapeHtml(d.code)}</div><div class="store-lock">Run <code>/linkstore ${escapeHtml(d.code)}</code> in Minecraft within ${d.expires_in_minutes} minutes.</div>`}catch(e){alert(e.message)}
 });
 document.querySelector("#store-unlink-minecraft")?.addEventListener("click",async()=>{if(confirm("Unlink this Minecraft account?")){try{await apiFetch("/api/linkstore/unlink",{method:"POST"});await render()}catch(e){alert(e.message)}}});
 document.querySelector("#store-unlink-discord")?.addEventListener("click",async()=>{if(confirm("Unlink Discord?")){try{await apiFetch("/api/discord/unlink",{method:"POST"});await render()}catch(e){alert(e.message)}}});
 document.querySelector("#link-minecraft")?.addEventListener("click",generateStoreCode);
 document.querySelector("#logout")?.addEventListener("click",async()=>{try{await apiFetch("/api/auth/logout",{method:"POST"})}catch(_){} currentAccount=null;render()});
 document.querySelector("#unlink-store")?.addEventListener("click",async()=>{if(confirm("Unlink this Minecraft account from your BlockBound account?")){try{await apiFetch("/api/linkstore/unlink",{method:"POST"});await render()}catch(e){alert(e.message)}}});
 document.querySelector("#unlink-discord")?.addEventListener("click",async()=>{if(confirm("Unlink Discord?")){try{await apiFetch("/api/discord/unlink",{method:"POST"});await render()}catch(e){alert(e.message)}}});
 const ipText=document.querySelector("#server-ip-text");if(ipText)ipText.textContent=IP;
 document.querySelector("#copy-ip")?.addEventListener("click",copyIP);document.querySelector("#discord-button")?.addEventListener("click",copyDiscord);updateDiscordDisplay();updateStatus();
}
function searchDelegation(e){const r=e.target.closest("[data-result]");if(r)location.hash="#/item/"+encodeURIComponent(r.dataset.result);}
document.addEventListener("click",searchDelegation);window.addEventListener("hashchange",()=>render());render();setInterval(updateStatus,30000);
