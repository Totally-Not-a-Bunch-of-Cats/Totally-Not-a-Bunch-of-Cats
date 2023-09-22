type Props = { toast: Toast };

export default function ToastWrapper({ toast }: Props) {
    console.log(typeof toast.message);
  return (
    <div
     className={`py-2 pr-4 pl-2 rounded-md shadow-md shadow-slate-700/30 flex gap-2 pointer-events-auto ${typeof toast.message !== 'function' ? 'bg-white' : ''}`}
    >
      {toast.duration ||
        <button className="w-6 h-6 text-slate-700/30 hover:text-rose-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-6 -6 24 24"><path fill="currentColor" d="m7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485L2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535l3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"/></svg>
        </button>
      }
      <div>
        {typeof toast.message === 'function' ? toast.message() : <span>{toast.message}</span>}
      </div>
    </div>
  );
}
