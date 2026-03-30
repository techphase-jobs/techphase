'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Trash2,
  Loader2,
  Eye,
  Mail,
  MailOpen,
  MailCheck,
  MessageSquare,
  Send,
  Globe,
  Clock,
  Monitor,
  User,
  Phone,
} from 'lucide-react'

interface Submission {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied'
  createdAt: string
  ip: string
  userAgent: string
  browser: string
}

const statusConfig: Record<string, { label: string; className: string }> = {
  new: { label: 'New', className: 'bg-[#ff8c00]/10 text-[#ff8c00] border-[#ff8c00]/20' },
  read: { label: 'Read', className: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  replied: { label: 'Replied', className: 'bg-green-500/10 text-green-400 border-green-500/20' },
}

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Reply state
  const [replyMessage, setReplyMessage] = useState('')
  const [replySending, setReplySending] = useState(false)
  const [replySuccess, setReplySuccess] = useState(false)
  const [replyError, setReplyError] = useState('')
  const [showReplyForm, setShowReplyForm] = useState(false)

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/submissions?limit=50')
      if (!res.ok) {
        setError('Failed to load submissions')
        return
      }
      const data = await res.json()
      setSubmissions(data.submissions || [])
    } catch {
      setError('Failed to load submissions')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSubmissions()
  }, [fetchSubmissions])

  const handleStatusUpdate = async (id: string, status: 'new' | 'read' | 'replied') => {
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)))
        if (selectedSubmission?.id === id) {
          setSelectedSubmission((prev) => (prev ? { ...prev, status } : null))
        }
      }
    } catch {
      // silently fail
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setSubmissions((prev) => prev.filter((s) => s.id !== id))
        if (selectedSubmission?.id === id) {
          setDialogOpen(false)
          setSelectedSubmission(null)
        }
      }
    } catch {
      // silently fail
    } finally {
      setDeletingId(null)
    }
  }

  const handleSendReply = async () => {
    if (!selectedSubmission || !replyMessage.trim()) return

    setReplySending(true)
    setReplyError('')
    setReplySuccess(false)

    try {
      const res = await fetch('/api/admin/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toEmail: selectedSubmission.email,
          subject: `Re: ${selectedSubmission.subject}`,
          replyMessage: replyMessage,
          submissionId: selectedSubmission.id,
        }),
      })

      if (res.ok) {
        setReplySuccess(true)
        setReplyMessage('')
        setShowReplyForm(false)
        // Auto-mark as replied
        handleStatusUpdate(selectedSubmission.id, 'replied')
      } else {
        const data = await res.json()
        setReplyError(data.error || 'Failed to send reply')
      }
    } catch {
      setReplyError('Failed to send reply. Please try again.')
    } finally {
      setReplySending(false)
    }
  }

  const openMessageDialog = (submission: Submission) => {
    setSelectedSubmission(submission)
    setDialogOpen(true)
    setShowReplyForm(false)
    setReplyMessage('')
    setReplySuccess(false)
    setReplyError('')
    // Auto-mark as read when viewing
    if (submission.status === 'new') {
      handleStatusUpdate(submission.id, 'read')
    }
  }

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Contact Submissions</h1>
        <p className="text-white/50 mt-1">Manage messages from your contact form</p>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-4 w-[80px] bg-white/10" />
                <Skeleton className="h-4 w-[100px] bg-white/10" />
                <Skeleton className="h-4 w-[120px] bg-white/10" />
                <Skeleton className="h-4 w-[100px] bg-white/10" />
                <Skeleton className="h-4 w-[150px] bg-white/10" />
                <Skeleton className="h-6 w-[60px] bg-white/10 rounded-full" />
              </div>
            ))}
          </div>
        ) : submissions.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="h-12 w-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/50">No submissions yet</p>
            <p className="text-white/30 text-sm mt-1">Messages from the contact form will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white/60 hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-white/60">Name</TableHead>
                  <TableHead className="text-white/60 hidden sm:table-cell">Email</TableHead>
                  <TableHead className="text-white/60 hidden lg:table-cell">Phone</TableHead>
                  <TableHead className="text-white/60">Subject</TableHead>
                  <TableHead className="text-white/60">Message</TableHead>
                  <TableHead className="text-white/60">Status</TableHead>
                  <TableHead className="text-white/60 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => {
                  const statusInfo = statusConfig[submission.status] || statusConfig.new
                  return (
                    <TableRow
                      key={submission.id}
                      className="border-white/5 hover:bg-white/5 cursor-pointer"
                      onClick={() => openMessageDialog(submission)}
                    >
                      <TableCell className="text-white/50 hidden md:table-cell whitespace-nowrap">
                        {formatDate(submission.createdAt)}
                      </TableCell>
                      <TableCell className="font-medium text-white whitespace-nowrap">{submission.name}</TableCell>
                      <TableCell className="text-white/50 hidden sm:table-cell whitespace-nowrap">{submission.email}</TableCell>
                      <TableCell className="text-white/50 hidden lg:table-cell whitespace-nowrap">{submission.phone || '—'}</TableCell>
                      <TableCell className="text-white/70 max-w-[150px] truncate">{submission.subject}</TableCell>
                      <TableCell className="max-w-[200px]">
                        <button
                          onClick={(e) => { e.stopPropagation(); openMessageDialog(submission) }}
                          className="text-[#ff8c00] hover:text-[#ff9f33] text-sm truncate block w-full text-left cursor-pointer transition-colors underline decoration-dotted underline-offset-2"
                          title="Click to read full message"
                        >
                          {submission.message.length > 50 ? submission.message.slice(0, 50) + '...' : submission.message}
                        </button>
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${statusInfo.className}`}>{statusInfo.label}</Badge>
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openMessageDialog(submission)}
                            className="text-white/50 hover:text-white hover:bg-white/5 h-8 w-8"
                            title="View message"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          {submission.status !== 'read' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleStatusUpdate(submission.id, 'read')}
                              disabled={updatingId === submission.id}
                              className="text-white/50 hover:text-blue-400 hover:bg-blue-500/10 h-8 w-8"
                              title="Mark as Read"
                            >
                              {updatingId === submission.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <MailOpen className="h-4 w-4" />
                              )}
                            </Button>
                          )}

                          {submission.status !== 'replied' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleStatusUpdate(submission.id, 'replied')}
                              disabled={updatingId === submission.id}
                              className="text-white/50 hover:text-green-400 hover:bg-green-500/10 h-8 w-8"
                              title="Mark as Replied"
                            >
                              {updatingId === submission.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <MailCheck className="h-4 w-4" />
                              )}
                            </Button>
                          )}

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={deletingId === submission.id}
                                className="text-white/50 hover:text-red-400 hover:bg-red-500/10 h-8 w-8"
                              >
                                {deletingId === submission.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-[#0e2a4a] border-white/10">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">Delete Submission</AlertDialogTitle>
                                <AlertDialogDescription className="text-white/50">
                                  Are you sure you want to delete the message from &quot;{submission.name}&quot;? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(submission.id)}
                                  className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Message Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setShowReplyForm(false); setReplySuccess(false); setReplyError('') } }}>
        <DialogContent className="bg-[#0e2a4a] border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedSubmission && (
            <>
              <DialogHeader>
                <DialogTitle className="text-white text-lg">{selectedSubmission.subject}</DialogTitle>
                <DialogDescription className="text-white/50 sr-only">
                  Message details for {selectedSubmission.name}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5">
                {/* Sender Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <User className="h-4 w-4 text-[#ff8c00] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-white/40 text-xs">Name</p>
                      <p className="text-white text-sm font-medium truncate">{selectedSubmission.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <Mail className="h-4 w-4 text-[#ff8c00] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-white/40 text-xs">Email</p>
                      <p className="text-[#ff8c00] text-sm font-medium truncate">{selectedSubmission.email}</p>
                    </div>
                  </div>
                  {selectedSubmission.phone && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <Phone className="h-4 w-4 text-[#ff8c00] shrink-0" />
                      <div>
                        <p className="text-white/40 text-xs">Phone</p>
                        <p className="text-white text-sm font-medium">{selectedSubmission.phone}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <Clock className="h-4 w-4 text-[#ff8c00] shrink-0" />
                    <div>
                      <p className="text-white/40 text-xs">Submitted</p>
                      <p className="text-white text-sm font-medium">{formatDateTime(selectedSubmission.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <Monitor className="h-4 w-4 text-[#ff8c00] shrink-0" />
                    <div>
                      <p className="text-white/40 text-xs">Browser</p>
                      <p className="text-white text-sm font-medium">{selectedSubmission.browser || 'Unknown'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <Globe className="h-4 w-4 text-[#ff8c00] shrink-0" />
                    <div>
                      <p className="text-white/40 text-xs">IP Address</p>
                      <p className="text-white text-sm font-medium font-mono">{selectedSubmission.ip || 'Unknown'}</p>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  <span className="text-white/50 text-sm">Status:</span>
                  <Badge className={`text-xs ${(statusConfig[selectedSubmission.status] || statusConfig.new).className}`}>
                    {(statusConfig[selectedSubmission.status] || statusConfig.new).label}
                  </Badge>
                </div>

                {/* Original Message */}
                <div>
                  <p className="text-white/50 text-sm mb-2">Message:</p>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                    <p className="text-white/80 text-sm whitespace-pre-wrap leading-relaxed">{selectedSubmission.message}</p>
                  </div>
                </div>

                {/* Reply Success */}
                {replySuccess && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <MailCheck className="h-4 w-4 text-green-400 shrink-0" />
                    <p className="text-green-400 text-sm">Reply sent successfully! Submission marked as replied.</p>
                  </div>
                )}

                {/* Reply Error */}
                {replyError && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-red-400 text-sm">{replyError}</p>
                  </div>
                )}

                {/* Reply Form */}
                {showReplyForm ? (
                  <div className="space-y-3 p-4 rounded-lg bg-white/5 border border-[#ff8c00]/20">
                    <p className="text-white text-sm font-medium">Reply to {selectedSubmission.name}</p>
                    <p className="text-white/40 text-xs">Subject: Re: {selectedSubmission.subject}</p>
                    <Textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply here..."
                      rows={5}
                      className="w-full bg-white/10 border border-white/10 text-white placeholder:text-white/30 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#ff8c00]/50 focus:ring-1 focus:ring-[#ff8c00]/50 resize-none"
                    />
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={handleSendReply}
                        disabled={replySending || !replyMessage.trim()}
                        className="bg-[#ff8c00] hover:bg-[#e07d00] text-white text-sm gap-2 disabled:opacity-50"
                      >
                        {replySending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                        Send Reply
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => { setShowReplyForm(false); setReplyMessage('') }}
                        className="border-white/10 text-white/70 hover:bg-white/10 hover:text-white text-sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 pt-2">
                    {selectedSubmission.status !== 'read' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(selectedSubmission.id, 'read')}
                        disabled={updatingId === selectedSubmission.id}
                        className="border-white/10 text-white/70 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/20 gap-2"
                      >
                        <MailOpen className="h-4 w-4" />
                        Mark as Read
                      </Button>
                    )}
                    {selectedSubmission.status !== 'replied' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(selectedSubmission.id, 'replied')}
                        disabled={updatingId === selectedSubmission.id}
                        className="border-white/10 text-white/70 hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/20 gap-2"
                      >
                        <MailCheck className="h-4 w-4" />
                        Mark as Replied
                      </Button>
                    )}
                    <Button
                      onClick={() => { setShowReplyForm(true); setReplySuccess(false); setReplyError('') }}
                      className="bg-[#ff8c00]/10 text-[#ff8c00] border border-[#ff8c00]/20 hover:bg-[#ff8c00]/20 gap-2 text-sm ml-auto"
                    >
                      <Send className="h-4 w-4" />
                      Reply via Email
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
