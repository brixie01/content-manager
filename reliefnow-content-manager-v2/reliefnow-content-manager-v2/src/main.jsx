import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  LayoutDashboard, History, Lightbulb, Settings, Copy, Check, Plus, Search,
  AlertTriangle, Download, Upload, Trash2, RefreshCcw, ShieldCheck
} from 'lucide-react';
import './styles.css';

const GREEN = '#8BBE29';
const STORAGE_KEY = 'reliefnow-content-manager-v2';
const OLD_STORAGE_KEY = 'reliefnow-content-manager-v1';
const BRAND_ASSETS = {
  reliefnow: '/logos/reliefnow-laser-centers.png',
  ditch: '/logos/ditch-drugs-skip-scalpel.png',
  secondOpinion: '/logos/get-your-second-opinion.png'
};

const ASSET_LABELS = {
  reliefnow: 'ReliefNow® Laser Centers logo',
  ditch: 'Ditch the Drugs and Skip the Scalpel® logo',
  secondOpinion: 'Get Your Second Opinion™ CTA bar'
};

const seedUsed = [
  ['Nerve','WHY DO MY FEET FEEL NUMB, BURNING, OR TINGLING?','Feet','Rest','Symptoms'],
  ['Nerve','WHY CAN NEUROPATHY MAKE NORMAL TOUCH FEEL UNCOMFORTABLE?','Feet','Touch','Sensitivity'],
  ['Nerve','WHY CAN NEUROPATHY AFFECT YOUR BALANCE EVEN WHEN YOU DON’T FEEL DIZZY?','Feet','Walking','Balance'],
  ['Nerve','WHY CAN YOUR FEET FEEL COLD EVEN WHEN THEY’RE WARM TO THE TOUCH?','Feet','Rest','Sensation'],
  ['Nerve','WHY CAN NEUROPATHY MAKE YOUR FEET FEEL HEAVY EVEN WHEN THEY AREN’T SWOLLEN?','Feet','Walking','Sensation'],
  ['Disc','IS YOUR LEG PAIN ACTUALLY STARTING IN YOUR LOWER BACK?','Lower back','Radiating leg pain','Source'],
  ['Disc','DOES A BULGING OR HERNIATED DISC ALWAYS MEAN SURGERY?','Spine','Disc finding','Education'],
  ['Disc','WHY DOES SITTING SOMETIMES MAKE DISC-RELATED PAIN FEEL WORSE?','Lower back','Sitting','Position'],
  ['Disc','WHY CAN A BULGING OR HERNIATED DISC CAUSE PAIN DOWN YOUR LEG?','Lower back','Leg pain','Radiation'],
  ['Disc','WHY DOES LOWER BACK PAIN CHANGE FROM DAY TO DAY?','Lower back','Daily activity','Pattern'],
  ['Disc','WHY CAN COUGHING OR SNEEZING SOMETIMES TRIGGER SHARP BACK OR LEG PAIN?','Lower back','Coughing or sneezing','Pressure'],
  ['Disc','DOES SITTING TOO LONG MAKE YOUR DISC PAIN WORSE? HERE’S WHY.','Lower back','Sitting','Position'],
  ['Disc','LEG PAIN, NUMBNESS, OR TINGLING? THE DISC MAY BE THE REAL SOURCE.','Lower back','Leg symptoms','Source'],
  ['Joint','WHY DOES YOUR KNEE HURT MORE GOING DOWN STAIRS?','Knee','Stairs','Load'],
  ['Joint','KNEE STIFF AFTER SITTING? HERE’S WHAT MAY BE GOING ON.','Knee','Sitting','Stiffness'],
  ['Joint','KNEE PAIN WHEN YOU TURN OR PIVOT? DON’T IGNORE THE PATTERN.','Knee','Turning or pivoting','Motion'],
  ['Joint','SHOULDER PAIN WHEN YOU REACH OVERHEAD? THE POSITION MAY BE THE CLUE.','Shoulder','Overhead reach','Position'],
  ['Joint','HIP PAIN WHEN YOU FIRST STAND UP? YOUR FIRST FEW STEPS MAY TELL YOU SOMETHING.','Hip','Standing up','First steps'],
  ['Joint','ANKLE PAIN WHEN YOU PUSH OFF TO WALK OR RUN? THE MOTION MAY BE THE CLUE.','Ankle','Push-off','Motion'],
  ['Joint','NECK PAIN WHEN YOU TURN TO CHECK YOUR BLIND SPOT? RANGE OF MOTION MAY BE THE CLUE.','Neck','Turning','Range of motion'],
  ['Joint','HAND OR WRIST PAIN WHEN YOU GRIP OR CARRY SOMETHING? THE LOAD MAY BE THE CLUE.','Wrist/hand','Grip or carry','Load'],
  ['Disc','LOW BACK PAIN WHEN YOU BEND TO PICK SOMETHING UP? PAY ATTENTION TO THE MOTION.','Lower back','Bending','Motion'],
  ['Joint','ELBOW PAIN WHEN YOU LIFT, GRIP, OR TWIST? IT MAY NOT JUST BE “OVERUSE.”','Elbow','Lift/grip/twist','Load'],
  ['Joint','FOOT PAIN AFTER STANDING FOR A WHILE? PAY ATTENTION TO WHEN IT STARTS.','Foot','Standing','Timing'],
  ['Joint','KNEE PAIN WHEN YOU GET OUT OF THE CAR? THAT TWISTING MOTION MAY MATTER.','Knee','Exiting car','Twisting'],
  ['Nerve','HAND NUMBNESS OR TINGLING WHEN YOU WAKE UP? YOUR SLEEPING POSITION MAY BE PART OF THE CLUE.','Hand','Sleeping','Position'],
  ['Disc','LOW BACK PAIN AFTER STANDING IN ONE PLACE TOO LONG? THE POSITION MAY BE PART OF THE PATTERN.','Lower back','Standing','Position']
].map((x,i)=>({id:`seed-${i}`, category:x[0], headline:x[1], bodyArea:x[2], trigger:x[3], angle:x[4], date:'Prior content', status:'Used'}));

const defaultSettings = {
  dailyCount: 3,
  categories: ['Disc','Joint','Nerve'],
  platforms: ['Meta','Instagram','LinkedIn'],
  visualMap: {Disc:'Light',Joint:'Dark',Nerve:'Cinematic'},
  activeContentType: 'Social Still',
  brandGreen: GREEN,
  closing: `Get Your Second Opinion™\nDitch the Drugs and Skip the Scalpel®\n\nFind a provider near you at https://reliefnowlaser.com/\n\nSee real patient testimonials and success stories at ReliefNow Nation:\nhttps://www.youtube.com/@ReliefNowNation`,
  rules: [
    'No guarantees or diagnosis claims',
    'No fear tactics',
    'No dramatic pain behavior',
    'Avoid pills, injections, and surgery imagery',
    'Use composed, believable expressions',
    'Use the official uploaded ReliefNow® brand assets exactly; never redraw, approximate, restyle, or substitute them'
  ],
  logoUsage: {
    'Social Still': {
      reliefnow: true,
      ditch: true,
      secondOpinion: true,
      placement: 'Use all three official assets. Keep the two logos clean and legible in the upper brand area; place the Get Your Second Opinion™ CTA bar as a distinct lower CTA element. Do not distort, recolor, crop, or recreate any asset.'
    },
    'Testimonial Overlay': {
      reliefnow: true,
      ditch: true,
      secondOpinion: true,
      placement: 'For 9:16 testimonial overlays, place the ReliefNow® Laser Centers logo and Ditch the Drugs and Skip the Scalpel® logo at the top with safe margins. Place the Get Your Second Opinion™ CTA bar at the bottom. Keep the patient unobstructed.'
    },
    'Blog Hero': {
      reliefnow: true,
      ditch: false,
      secondOpinion: false,
      placement: 'Use the official ReliefNow® Laser Centers logo only, kept smaller and secondary to the headline. Maintain generous copy space and do not fabricate additional logo treatments.'
    }
  },
  visualPresets: {
    Light: 'Create a bright, premium healthcare editorial look with a clean white or soft-neutral environment, natural daylight, subtle ReliefNow® green accents, realistic skin and materials, restrained red/orange pain emphasis only at the relevant body area, generous negative space for headline copy, and a polished clinical—not sterile—finish.',
    Dark: 'Create a premium dark healthcare poster with charcoal/black foundations, controlled studio or clinic lighting, ReliefNow® green accents, high readability, realistic anatomy/pain emphasis kept subtle, strong subject separation, and clean negative space for headline and brand assets. Avoid muddy shadows or overly dramatic pain imagery.',
    Cinematic: 'Create a realistic cinematic healthcare scene with dimensional lighting, premium modern-clinic or believable daily-life setting, controlled highlights, deep but readable shadows, ReliefNow® green environmental accents, tasteful red/orange focus at the symptom area, composed expression, and intentional negative space for typography and official assets.'
  }
};

const defaultState = { used: seedUsed, ideas: [], settings: defaultSettings };

function mergeState(raw){
  if(!raw || typeof raw !== 'object') return defaultState;
  const s = raw.settings || {};
  return {
    used: Array.isArray(raw.used) ? raw.used : seedUsed,
    ideas: Array.isArray(raw.ideas) ? raw.ideas : [],
    settings: {
      ...defaultSettings,
      ...s,
      visualMap: {...defaultSettings.visualMap, ...(s.visualMap||{})},
      logoUsage: Object.fromEntries(Object.entries(defaultSettings.logoUsage).map(([k,v])=>[k,{...v,...((s.logoUsage||{})[k]||{})}])),
      visualPresets: {...defaultSettings.visualPresets, ...(s.visualPresets||{})},
      rules: Array.isArray(s.rules) ? s.rules : defaultSettings.rules
    }
  };
}

function loadState(){
  try {
    const v2 = localStorage.getItem(STORAGE_KEY);
    if(v2) return mergeState(JSON.parse(v2));
    const v1 = localStorage.getItem(OLD_STORAGE_KEY);
    if(v1){
      const migrated = mergeState(JSON.parse(v1));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
    return defaultState;
  } catch { return defaultState; }
}
function saveState(v){ localStorage.setItem(STORAGE_KEY, JSON.stringify(v)); }
function normalize(s=''){ return s.toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim(); }
function tokens(s){ return new Set(normalize(s).split(' ').filter(w=>w.length>2 && !['the','and','when','your','you','may','can','why','does','after','for','too','what','here'].includes(w))); }
function similarity(a,b){
  const A=tokens(a), B=tokens(b); if(!A.size || !B.size) return 0;
  const inter=[...A].filter(x=>B.has(x)).length; const union=new Set([...A,...B]).size;
  return Math.round((inter/union)*100);
}
function requiredAssets(rule){
  return Object.entries(rule).filter(([k,v])=>k!=='placement' && v).map(([k])=>ASSET_LABELS[k]);
}

function App(){
  const [data,setData] = useState(loadState);
  const [tab,setTab] = useState('Today');
  const [copied,setCopied] = useState(false);
  const [query,setQuery] = useState('');
  const [candidate,setCandidate] = useState({headline:'',category:'Disc',bodyArea:'',trigger:'',angle:''});
  const [draft,setDraft] = useState({category:'Disc',headline:'',bodyArea:'',trigger:'',angle:'',date:new Date().toISOString().slice(0,10)});

  const updateData = fn => setData(prev=>{ const next=fn(prev); saveState(next); return next; });
  const contentTypes = Object.keys(data.settings.logoUsage);
  const activeRule = data.settings.logoUsage[data.settings.activeContentType] || data.settings.logoUsage['Social Still'];

  const prompt = useMemo(()=>{
    const used = data.used.map((x,i)=>`${i+1}. [${x.category}] ${x.headline} | Body area: ${x.bodyArea||'-'} | Trigger: ${x.trigger||'-'} | Angle: ${x.angle||'-'}`).join('\n');
    const assets = requiredAssets(activeRule);
    const visualBlocks = ['Disc','Joint','Nerve'].map(cat=>{
      const style = data.settings.visualMap[cat];
      return `- ${cat} = ${style}: ${data.settings.visualPresets[style]}`;
    }).join('\n');
    return `Create today’s ReliefNow® social media content.\n\nI need exactly 3 completely fresh topics: 1 Disc, 1 Joint, and 1 Nerve.\n\nIMPORTANT: Check the USED CONTENT list below. Do not reuse an exact headline, substantially similar topic, or the same body-area + trigger + educational angle combination. If a candidate feels too close, replace it.\n\nCONTENT TYPE: ${data.settings.activeContentType}\n\nFor each of the 3 selected topics provide:\n1. Category\n2. Headline\n3. Body area\n4. Trigger / scenario\n5. Educational angle\n6. Premium 4:5 (1080×1350) image/poster prompt\n7. Meta copy\n8. Instagram copy\n9. LinkedIn copy\n10. Optimized hashtags for each platform\n\nVISUAL STYLE ROTATION + EXACT DEFAULT PROMPT BLOCKS:\n${visualBlocks}\n\nOFFICIAL RELIEFNOW® BRAND RULES:\n${data.settings.rules.map(x=>`- ${x}`).join('\n')}\n- ReliefNow® green: ${data.settings.brandGreen}\n\nOFFICIAL ASSETS REQUIRED FOR ${data.settings.activeContentType.toUpperCase()}:\n${assets.length ? assets.map(x=>`- ${x}`).join('\n') : '- No logo asset required'}\nPlacement rule: ${activeRule.placement}\n- Treat the uploaded brand files as source-of-truth assets. Do not generate lookalike logos, substitute fonts, alter proportions, or reinterpret the marks.\n\nRequired closing block for social copy:\n${data.settings.closing}\n\nUSED CONTENT — DO NOT REPEAT OR CLOSELY DUPLICATE:\n${used}`;
  },[data,activeRule]);

  const match = useMemo(()=>{
    if(!candidate.headline.trim()) return null;
    const scored = data.used.map(x=>({
      x,
      score: similarity(candidate.headline,x.headline)
        + (candidate.category===x.category?10:0)
        + (candidate.bodyArea && normalize(candidate.bodyArea)===normalize(x.bodyArea)?12:0)
        + (candidate.trigger && normalize(candidate.trigger)===normalize(x.trigger)?12:0)
        + (candidate.angle && normalize(candidate.angle)===normalize(x.angle)?8:0)
    })).sort((a,b)=>b.score-a.score)[0];
    return scored ? {...scored.x, score: Math.min(100,scored.score)} : null;
  },[candidate,data.used]);

  const addUsed = () => {
    if(!draft.headline.trim()) return;
    updateData(d=>({...d,used:[{...draft,id:crypto.randomUUID(),status:'Used'},...d.used]}));
    setDraft({...draft,headline:'',bodyArea:'',trigger:'',angle:''});
  };
  const addIdea = () => {
    if(!draft.headline.trim()) return;
    updateData(d=>({...d,ideas:[{...draft,id:crypto.randomUUID(),status:'Idea'},...d.ideas]}));
    setDraft({...draft,headline:'',bodyArea:'',trigger:'',angle:''});
  };

  const filtered = data.used.filter(x=>[x.headline,x.category,x.bodyArea,x.trigger,x.angle].join(' ').toLowerCase().includes(query.toLowerCase()));
  const exportData = ()=>{
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download='reliefnow-content-data-v2.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const importData = e=>{
    const f=e.target.files?.[0];
    if(!f)return;
    const r=new FileReader();
    r.onload=()=>{
      try{const v=mergeState(JSON.parse(r.result)); saveState(v); setData(v);}catch{alert('Invalid JSON file.');}
    };
    r.readAsText(f);
  };

  return <div className="app">
    <aside className="sidebar">
      <div className="brandBlock">
        <img src={BRAND_ASSETS.reliefnow} alt="ReliefNow Laser Centers" className="brandLogo" />
        <div className="brandText"><strong>Content Manager V2</strong><span>Official ReliefNow® brand system loaded</span></div>
      </div>
      <div className="assetStack">
        <img src={BRAND_ASSETS.ditch} alt="Ditch the Drugs and Skip the Scalpel logo" className="assetPreview darkTile" />
        <img src={BRAND_ASSETS.secondOpinion} alt="Get Your Second Opinion CTA bar" className="assetPreview" />
      </div>
      <nav>{[
        ['Today',LayoutDashboard],['History',History],['Idea Bank',Lightbulb],['Duplicate Check',AlertTriangle],['Brand Rules',ShieldCheck],['Settings',Settings]
      ].map(([name,Icon])=><button key={name} className={tab===name?'active':''} onClick={()=>setTab(name)}><Icon size={18}/>{name}</button>)}</nav>
      <div className="sidebarFoot"><span>V2 • Local-first • No API cost</span><small>V1 browser data migrates automatically when available.</small></div>
    </aside>

    <main>
      <header><div><p className="eyebrow">RELIEFNOW® CONTENT ENGINE V2</p><h1>{tab}</h1></div><div className="status"><span></span>Zero API cost</div></header>

      {tab==='Today' && <>
        <section className="heroCard">
          <div><span className="pill">DAILY WORKFLOW</span><h2>Disc + Joint + Nerve, with brand rules built in.</h2><p>The copied prompt includes your content history, official asset requirements, and the exact Light / Dark / Cinematic prompt blocks.</p></div>
          <div className="heroActions">
            <label className="miniSelect">Content type<select value={data.settings.activeContentType} onChange={e=>updateData(d=>({...d,settings:{...d.settings,activeContentType:e.target.value}}))}>{contentTypes.map(x=><option key={x}>{x}</option>)}</select></label>
            <button className="primary" onClick={async()=>{await navigator.clipboard.writeText(prompt);setCopied(true);setTimeout(()=>setCopied(false),1600)}}>{copied?<Check size={18}/>:<Copy size={18}/>} {copied?'Copied':'Copy Daily ChatGPT Prompt'}</button>
          </div>
        </section>

        <section className="panel assetPanel">
          <div className="panelHead compact"><div><h3>Assets required today</h3><p>{data.settings.activeContentType}: {activeRule.placement}</p></div></div>
          <div className="assetPanelGrid">
            {activeRule.reliefnow && <AssetCard title="ReliefNow® Laser Centers" src={BRAND_ASSETS.reliefnow} alt="ReliefNow Laser Centers logo" dark />}
            {activeRule.ditch && <AssetCard title="Ditch the Drugs and Skip the Scalpel®" src={BRAND_ASSETS.ditch} alt="Ditch the Drugs and Skip the Scalpel logo" dark />}
            {activeRule.secondOpinion && <AssetCard title="Get Your Second Opinion™" src={BRAND_ASSETS.secondOpinion} alt="Get Your Second Opinion CTA bar" />}
          </div>
        </section>

        <section className="grid3">
          {['Disc','Joint','Nerve'].map(cat=>{
            const style=data.settings.visualMap[cat];
            return <div className="categoryCard" key={cat}><div className="catTop"><span className={`dot ${cat.toLowerCase()}`}></span><strong>{cat}</strong><span>{style}</span></div><h3>{data.used.find(x=>x.category===cat)?.headline || 'No content yet'}</h3><p>{data.settings.visualPresets[style]}</p></div>
          })}
        </section>

        <section className="panel"><div className="panelHead"><div><h3>Record a selected topic</h3><p>Add it to history so future prompts automatically avoid it.</p></div></div><Editor draft={draft} setDraft={setDraft}/><div className="actions"><button className="primary" onClick={addUsed}><Plus size={17}/>Mark as Used</button><button className="secondary" onClick={addIdea}><Lightbulb size={17}/>Save to Idea Bank</button></div></section>
        <section className="panel"><div className="panelHead"><div><h3>Prompt preview</h3><p>Everything below is what gets copied into ChatGPT.</p></div></div><pre className="promptPreview">{prompt}</pre></section>
      </>}

      {tab==='History' && <section className="panel"><div className="panelHead"><div><h3>Used content</h3><p>{data.used.length} topics recorded</p></div><div className="search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search headline, area, trigger…"/></div></div><div className="tableWrap"><table><thead><tr><th>Category</th><th>Headline</th><th>Body area</th><th>Trigger</th><th>Angle</th><th>Date</th></tr></thead><tbody>{filtered.map(x=><tr key={x.id}><td><span className={`badge ${x.category.toLowerCase()}`}>{x.category}</span></td><td className="headlineCell">{x.headline}</td><td>{x.bodyArea}</td><td>{x.trigger}</td><td>{x.angle}</td><td>{x.date}</td></tr>)}</tbody></table></div></section>}

      {tab==='Idea Bank' && <section className="panel"><div className="panelHead"><div><h3>Unused ideas</h3><p>Keep good ideas without marking them as published.</p></div></div>{data.ideas.length===0?<Empty icon={Lightbulb} title="No saved ideas yet" text="Use ‘Save to Idea Bank’ from Today."/>:<div className="cards">{data.ideas.map(x=><article className="ideaCard" key={x.id}><span className={`badge ${x.category.toLowerCase()}`}>{x.category}</span><h3>{x.headline}</h3><p>{x.bodyArea} • {x.trigger} • {x.angle}</p><div className="actions"><button className="secondary" onClick={()=>updateData(d=>({...d,ideas:d.ideas.filter(i=>i.id!==x.id),used:[{...x,status:'Used',date:new Date().toISOString().slice(0,10)},...d.used]}))}><Check size={16}/>Use today</button><button className="iconBtn" onClick={()=>updateData(d=>({...d,ideas:d.ideas.filter(i=>i.id!==x.id)}))}><Trash2 size={16}/></button></div></article>)}</div>}</section>}

      {tab==='Duplicate Check' && <section className="panel"><div className="panelHead"><div><h3>Check a candidate before using it</h3><p>Local similarity check using headline + structured tags. No AI required.</p></div></div><Editor draft={candidate} setDraft={setCandidate}/>{match && candidate.headline && <div className={`match ${match.score>=60?'warn':'ok'}`}><div><AlertTriangle size={22}/><div><strong>{match.score}% similarity signal</strong><p>Closest recorded topic:</p></div></div><blockquote>{match.headline}</blockquote><small>{match.category} • {match.bodyArea} • {match.trigger} • {match.angle}</small></div>}</section>}

      {tab==='Brand Rules' && <>
        <section className="panel"><div className="panelHead"><div><h3>Official brand assets</h3><p>The bundled files below are the source of truth. The app instructs ChatGPT not to redraw or substitute them.</p></div></div><div className="assetPanelGrid"><AssetCard title="ReliefNow® Laser Centers" src={BRAND_ASSETS.reliefnow} alt="ReliefNow Laser Centers logo" dark /><AssetCard title="Ditch the Drugs and Skip the Scalpel®" src={BRAND_ASSETS.ditch} alt="Ditch the Drugs and Skip the Scalpel logo" dark /><AssetCard title="Get Your Second Opinion™" src={BRAND_ASSETS.secondOpinion} alt="Get Your Second Opinion CTA bar" /></div></section>

        <section className="panel"><div className="panelHead"><div><h3>Logo usage by content type</h3><p>Choose exactly which official assets must be referenced for each output type.</p></div></div><div className="ruleCards">{contentTypes.map(type=>{const rule=data.settings.logoUsage[type];return <article className="ruleCard" key={type}><h3>{type}</h3><div className="checkRows">{Object.keys(ASSET_LABELS).map(key=><label className="checkRow" key={key}><input type="checkbox" checked={!!rule[key]} onChange={e=>updateData(d=>({...d,settings:{...d.settings,logoUsage:{...d.settings.logoUsage,[type]:{...d.settings.logoUsage[type],[key]:e.target.checked}}}}))}/><span>{ASSET_LABELS[key]}</span></label>)}</div><label className="fullLabel">Placement / usage rule<textarea rows="5" value={rule.placement} onChange={e=>updateData(d=>({...d,settings:{...d.settings,logoUsage:{...d.settings.logoUsage,[type]:{...d.settings.logoUsage[type],placement:e.target.value}}}}))}/></label></article>})}</div></section>

        <section className="panel"><div className="panelHead"><div><h3>Visual prompt presets</h3><p>Edit the default style language once; every daily prompt will reuse it automatically.</p></div></div><div className="presetCards">{Object.entries(data.settings.visualPresets).map(([name,value])=><article className="presetCard" key={name}><div className="presetTitle"><span className={`presetDot ${name.toLowerCase()}`}></span><h3>{name}</h3></div><textarea rows="9" value={value} onChange={e=>updateData(d=>({...d,settings:{...d.settings,visualPresets:{...d.settings.visualPresets,[name]:e.target.value}}}))}/></article>)}</div></section>
      </>}

      {tab==='Settings' && <section className="panel"><div className="panelHead"><div><h3>Workflow settings</h3><p>These values are inserted into every generated ChatGPT prompt.</p></div></div><div className="settingsGrid"><label>Brand green<input value={data.settings.brandGreen} onChange={e=>updateData(d=>({...d,settings:{...d.settings,brandGreen:e.target.value}}))}/></label><label>Disc visual<select value={data.settings.visualMap.Disc} onChange={e=>updateData(d=>({...d,settings:{...d.settings,visualMap:{...d.settings.visualMap,Disc:e.target.value}}}))}><option>Light</option><option>Dark</option><option>Cinematic</option></select></label><label>Joint visual<select value={data.settings.visualMap.Joint} onChange={e=>updateData(d=>({...d,settings:{...d.settings,visualMap:{...d.settings.visualMap,Joint:e.target.value}}}))}><option>Light</option><option>Dark</option><option>Cinematic</option></select></label><label>Nerve visual<select value={data.settings.visualMap.Nerve} onChange={e=>updateData(d=>({...d,settings:{...d.settings,visualMap:{...d.settings.visualMap,Nerve:e.target.value}}}))}><option>Light</option><option>Dark</option><option>Cinematic</option></select></label></div><label className="fullLabel">Required closing block<textarea rows="8" value={data.settings.closing} onChange={e=>updateData(d=>({...d,settings:{...d.settings,closing:e.target.value}}))}/></label><div className="settingsActions"><button className="secondary" onClick={exportData}><Download size={17}/>Export V2 backup</button><label className="secondary fileBtn"><Upload size={17}/>Import backup<input type="file" accept="application/json" onChange={importData}/></label><button className="danger" onClick={()=>{if(confirm('Reset all local data to the V2 starter dataset?')){saveState(defaultState);setData(defaultState)}}}><RefreshCcw size={17}/>Reset starter data</button></div></section>}
    </main>
  </div>
}

function Editor({draft,setDraft}){
  return <div className="editorGrid">
    <label>Category<select value={draft.category} onChange={e=>setDraft({...draft,category:e.target.value})}><option>Disc</option><option>Joint</option><option>Nerve</option></select></label>
    <label className="span2">Headline<input value={draft.headline} onChange={e=>setDraft({...draft,headline:e.target.value})} placeholder="Paste the selected headline…"/></label>
    <label>Body area<input value={draft.bodyArea} onChange={e=>setDraft({...draft,bodyArea:e.target.value})} placeholder="e.g. Knee"/></label>
    <label>Trigger / scenario<input value={draft.trigger} onChange={e=>setDraft({...draft,trigger:e.target.value})} placeholder="e.g. Stairs"/></label>
    <label>Educational angle<input value={draft.angle} onChange={e=>setDraft({...draft,angle:e.target.value})} placeholder="e.g. Load"/></label>
  </div>
}

function AssetCard({title,src,alt,dark=false}){
  return <article className={`assetCard ${dark?'darkTile':''}`}><p>{title}</p><img src={src} alt={alt} /></article>
}
function Empty({icon:Icon,title,text}){return <div className="empty"><Icon size={32}/><h3>{title}</h3><p>{text}</p></div>}

createRoot(document.getElementById('root')).render(<App/>);
