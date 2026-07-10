import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { bloggposts, formatDato } from '../data/bloggposts'
import EtterklangAnimasjon from '../components/blogg/EtterklangAnimasjon'
import AbsorpsjonDiffusjonAnimasjon from '../components/blogg/AbsorpsjonDiffusjonAnimasjon'
import TaletydelighetAnimasjon from '../components/blogg/TaletydelighetAnimasjon'
import NS8175Animasjon from '../components/blogg/NS8175Animasjon'

export default function BloggPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = bloggposts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-cream mb-4">Post ikke funnet</h1>
          <Link to="/blogg" className="text-copper-light hover:underline">Tilbake til bloggen</Link>
        </div>
      </div>
    )
  }

  const relaterte = bloggposts
    .filter(p => p.kategori === post.kategori && p.id !== post.id)
    .slice(0, 3)

  return (
    <article className="min-h-screen bg-dark pt-20">
      {/* Hero bilde */}
      <div className="relative aspect-[21/9] max-h-[500px]">
        <img src={post.bilde} alt={post.tittel} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent" />
      </div>

      {/* Innhold */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 -mt-32 relative z-10">
        <Link to="/blogg" className="inline-flex items-center gap-2 text-cream/50 text-sm hover:text-copper-light transition-colors mb-6">
          <ArrowLeft size={16} /> Tilbake til bloggen
        </Link>

        <span className="inline-block px-3 py-1 bg-copper/15 text-copper-light text-xs font-medium uppercase tracking-wider rounded mb-4">
          {post.kategori}
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream mb-6 leading-tight">{post.tittel}</h1>

        <div className="flex items-center gap-5 text-cream/40 text-sm mb-10 pb-10 border-b border-cream/5">
          <span className="flex items-center gap-1.5"><User size={14} /> Thorbjørn Danbolt</span>
          <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatDato(post.dato)}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> {post.lestetid} min lesning</span>
        </div>

        {/* Ingress */}
        <p className="text-cream/70 text-lg leading-relaxed mb-10 font-medium italic border-l-2 border-copper/30 pl-6">
          {post.ingress}
        </p>

        {/* Animert illustrasjon */}
        {post.slug === 'etterklangstid-kirke' && <EtterklangAnimasjon />}
        {post.slug === 'absorpsjon-vs-diffusjon' && <AbsorpsjonDiffusjonAnimasjon />}
        {post.slug === 'taletydelighet-sti' && <TaletydelighetAnimasjon />}
                {post.slug === 'ns8175-etterklangskrav' && <NS8175Animasjon />}

        {/* Hovedinnhold */}
        <div
          className="prose-blogg mb-16"
          dangerouslySetInnerHTML={{ __html: post.innhold }}
        />

        {/* Relaterte poster */}
        {relaterte.length > 0 && (
          <div className="border-t border-cream/5 pt-12 pb-20">
            <h3 className="font-serif text-2xl text-cream mb-8">Relaterte innlegg</h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {relaterte.map(r => (
                <Link key={r.id} to={`/blogg/${r.slug}`}
                  className="group bg-dark-card rounded-lg border border-copper/10 p-5 hover:border-copper/30 transition-all">
                  <span className="text-copper-light text-xs uppercase tracking-wider">{r.kategori}</span>
                  <h4 className="font-serif text-base text-cream mt-2 group-hover:text-copper-light transition-colors">{r.tittel}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
