'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Project = {
  id: string;
  title: string;
  status: 'en collecte' | 'financé';
  category: string;
  description: string;
  collected: number;
  target: number;
  daysLeft: number;
  contributors: number;
};

export default function CrowdfundingPage() {
  const router = useRouter();

  /* --- exemples --- */
  const allProjects: Project[] = [
    { id: 'cabane',  title: 'Cabane Éclairée',        status: 'en collecte', category: 'Culture',    description: 'Atelier de création libre à bord d’une caravane.',              collected: 7_910_000, target: 10_000_000, daysLeft: 13, contributors: 90 },
    { id: 'lowtech', title: 'Low‑Tech Lab Bordeaux',  status: 'en collecte', category: 'Innovation', description: 'Faire connaître et pratiquer la low‑tech !',                    collected: 2_700_000, target: 6_000_000,  daysLeft: 13, contributors: 17 },
    { id: 'dedale',  title: 'Dédale',                 status: 'financé',     category: 'Social',     description: 'Sécurisons les lieux de vie informels !',                       collected:11_091_000, target:10_000_000,  daysLeft: 13, contributors: 60 },
    { id: 'senior',  title: 'Atelier Physique Senior',status: 'en collecte', category: 'Santé',      description: 'Activités physiques et culturelles pour nos aînés.',            collected: 2_760_000, target:10_000_000,  daysLeft: 13, contributors: 12 }
  ];
  /* --------------- */

  const [catFilter,   setCatFilter]   = useState('');
  const [search,      setSearch]      = useState('');
  const [statusSel,   setStatusSel]   = useState<'all'|'en collecte'|'financé'>('all');

  const uniqueCats = [...new Set(allProjects.map(p => p.category))];

  const filtered = allProjects.filter(p =>
    (statusSel === 'all' || p.status === statusSel) &&
    (!catFilter || p.category === catFilter) &&
    (!search || p.title.toLowerCase().includes(search.toLowerCase()))
  );

  /* --- navigation sur détails --- */
  const goToDetails = (proj: Project) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentProject', JSON.stringify(proj));
    }
    router.push('/crowdfunding/details');
  };
  /* ------------------------------ */

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* AppBar identique */}
      <header style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem 2rem',background:'white' }}>
        <div style={{ display:'flex',alignItems:'center',gap:'0.5rem',fontWeight:'bold' }}>
          <span style={{ width:20,height:20,background:'#ccc',borderRadius:'50%',display:'inline-block' }} />
          Logo
        </div>
        <nav style={{ display:'flex',gap:'1.5rem' }}>
          <Link href="/hub">Accueil</Link><Link href="/annuaire">Annuaire</Link>
          <Link href="/deals-m-a">Deals M&A</Link><Link href="/crowdfunding">Crowdfunding</Link>
          <Link href="/connexion">Connexion /</Link>
        </nav>
      </header>

      <main style={{ padding:'2rem' }}>
        <h1 style={{ fontSize:'2rem',marginBottom:'0.5rem' }}>Crowdfunding</h1>
        <p style={{ marginBottom:'1.5rem',color:'#555' }}>Soutenez les projets qui vous tiennent à cœur ! Investissez dès maintenant pour les faire grandir.</p>

        {/* filtres */}
        <div style={{ display:'flex',flexWrap:'wrap',alignItems:'center',gap:'1rem',marginBottom:'2rem' }}>
          <select value={catFilter} onChange={e=>setCatFilter(e.target.value)} style={{ padding:'0.5rem',borderRadius:5,border:'1px solid #ccc' }}>
            <option value=''>Catégorie</option>{uniqueCats.map(c=> <option key={c}>{c}</option>)}
          </select>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Recherche projet"
                 style={{ padding:'0.5rem',border:'1px solid #ccc',borderRadius:5,flex:1,minWidth:180 }} />

          {(['all','en collecte','financé'] as const).map(st=>(
            <button key={st} onClick={()=>setStatusSel(st)}
                    style={{ padding:'0.45rem 0.9rem',borderRadius:6,
                             border: statusSel===st?'2px solid #003087':'1px solid #ccc',
                             background: statusSel===st?'#003087':'white',
                             color: statusSel===st?'white':'#003087',cursor:'pointer' }}>
              {st==='all'?'Tous':st==='en collecte'?'En collecte':'Financés'}
            </button>
          ))}
        </div>

        {/* cartes */}
        <div style={{ display:'flex',flexWrap:'wrap',gap:'1rem',justifyContent:'space-between' }}>
          {filtered.map(p=>{
            const percent=Math.min(100,Math.round(p.collected/p.target*100));
            return(
              <div key={p.id} onClick={()=>goToDetails(p)}
                   style={{ cursor:'pointer',background:'#f9f9f9',borderRadius:10,padding:'1rem',
                            flex:'0 1 calc(25% - 1rem)',boxShadow:'0 0 8px rgba(0,0,0,0.05)' }}>
                <div style={{ height:8,background:'#003087',borderRadius:4,marginBottom:'0.5rem' }}/>
                <div style={{ width:'100%',height:140,background:'#ccc',borderRadius:6,marginBottom:'0.8rem' }}/>
                <h3 style={{ textAlign:'center',margin:0,marginBottom:'0.8rem',fontSize:'1rem' }}>{p.title}</h3>
                <p style={{ fontSize:'0.85rem',color:'#555',marginBottom:'0.8rem' }}>{p.description}</p>
                <p style={{ textAlign:'center',margin:0,marginBottom:'0.3rem',fontSize:'1.1rem',fontWeight:600 }}>
                  {new Intl.NumberFormat('fr-FR').format(p.collected)} F&nbsp;CFA
                </p>
                <p style={{ textAlign:'center',margin:0,fontSize:'0.8rem',color:'#666' }}>déjà collectés</p>
                <div style={{ height:6,background:'#ddd',borderRadius:3,marginTop:'0.4rem',marginBottom:'0.3rem' }}>
                  <div style={{ width:`${percent}%`,height:'100%',background:'#003087',borderRadius:3 }} />
                </div>
                <p style={{ textAlign:'center',fontSize:'0.75rem',color:'#666',margin:0 }}>{percent}% financé</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}