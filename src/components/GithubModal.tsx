import React from 'react';
import { X, Check, Copy, Code2, Globe, FileCode } from 'lucide-react';

interface GithubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GithubModal: React.FC<GithubModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const gitCode = `git init
git add .
git commit -m "CineLos filmový losovač"
git branch -M main
git remote add origin https://github.com/<vase-jmeno>/<nazev-repozitare>.git
git push -u origin main`;

  const copyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(gitCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-100">
                Jak nahrát CineLos na GitHub Pages jako HTML
              </h3>
              <p className="text-xs text-neutral-400">
                Aplikace je zkompilována do jediného samostatného souboru
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1 */}
        <div className="space-y-4 text-xs text-neutral-300">
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
              <Globe className="w-4 h-4" />
              <span>Možnost A: Připravená složka docs/index.html (Čisté HTML)</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Díky nakonfigurovanému balíčku <strong className="text-neutral-200">vite-plugin-singlefile</strong> je vygenerován soubor <code className="text-amber-300 bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">docs/index.html</code>, který obsahuje veškerý kód, styly, logiku i celou filmovou databázi přímo v jediném HTML souboru.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              V repozitáři na GitHubu stačí přejít do <em>Settings → Pages</em>, zvolit větev <strong>main</strong> a složku <strong>/docs</strong> a kliknout na <strong>Save</strong>. Během minuty máte funkční čisté HTML online!
            </p>
          </div>

          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-neutral-200 font-semibold text-xs">
                <Code2 className="w-4 h-4 text-amber-400" />
                <span>Možnost B: Automatický GitHub Actions build</span>
              </div>
              <button
                onClick={copyCode}
                className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Zkopírováno' : 'Kopírovat příkazy'}</span>
              </button>
            </div>
            <pre className="p-3 bg-neutral-900 rounded-lg border border-neutral-800 text-[11px] font-mono text-neutral-300 overflow-x-auto">
              {gitCode}
            </pre>
            <p className="text-[11px] text-neutral-500">
              V repozitáři na GitHubu v <em>Settings → Pages</em> jen přepnete <strong>Source</strong> na <strong>GitHub Actions</strong>.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-lg transition-colors cursor-pointer"
          >
            Rozumím
          </button>
        </div>
      </div>
    </div>
  );
};
