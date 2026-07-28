import React, { useEffect } from 'react';
import { Mail, MailOpen, Trash2, Reply, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';

export const MessagesCMS = () => {
  const { messages = [], markMessageRead, markAllMessagesRead, deleteMessage } = useData();

  const safeMessages = Array.isArray(messages) ? messages : [];

  // Automatically mark all unread messages as read when viewing the Contact Messages panel
  useEffect(() => {
    const unreadMsgs = safeMessages.filter((m) => !m.read);
    if (unreadMsgs.length > 0) {
      markAllMessagesRead();
    }
  }, [safeMessages.length]);

  const formatDate = (dateVal) => {
    if (!dateVal) return 'Recently';
    try {
      if (typeof dateVal === 'object' && dateVal?.seconds) {
        return new Date(dateVal.seconds * 1000).toLocaleDateString();
      }
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return 'Recently';
      return d.toLocaleDateString();
    } catch (e) {
      return 'Recently';
    }
  };

  const handleMarkRead = async (id) => {
    await markMessageRead(id);
    toast.success('Marked as read');
  };

  const handleDelete = async (id) => {
    await deleteMessage(id);
    toast.success('Message deleted');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-100">Contact Inbox</h2>
        <p className="text-xs text-slate-400">Messages sent via public contact form</p>
      </div>

      <div className="space-y-4">
        {safeMessages.length > 0 ? (
          safeMessages.map((msg) => (
            <div
              key={msg.id}
              className={`glass-panel p-6 rounded-2xl border transition-all ${
                !msg.read ? 'border-indigo-500/60 bg-indigo-950/20' : 'border-slate-800'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${!msg.read ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {!msg.read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-100">{msg.name || 'Anonymous Inquiry'}</h4>
                    <p className="text-xs text-indigo-400 font-mono">{msg.email || 'No email provided'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {formatDate(msg.createdAt)}
                  </span>
                  {!msg.read && (
                    <button onClick={() => handleMarkRead(msg.id)} className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold">
                      Mark Read
                    </button>
                  )}
                  {msg.email && (
                    <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                      <Reply className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button onClick={() => handleDelete(msg.id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {msg.subject && (
                <p className="text-xs font-bold text-slate-200 mb-2">Subject: {msg.subject}</p>
              )}
              <p className="text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed whitespace-pre-wrap">
                {msg.message || '(No message body)'}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800 text-slate-400 text-xs">
            No contact form inquiries yet.
          </div>
        )}
      </div>
    </div>
  );
};