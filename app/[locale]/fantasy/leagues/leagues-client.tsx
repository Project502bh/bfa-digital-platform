"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { globalLeaderboard } from "@/lib/data/fantasy";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Trophy, Plus, Users, Copy, CheckCircle2 } from "lucide-react";

const MY_LEAGUES_MOCK = [
  {
    id: "1",
    name: { en: "Bahrain Office League", ar: "دوري المكتب البحريني" },
    rank: 3,
    total: 298,
    code: "BAH123",
    members: 12,
  },
  {
    id: "2",
    name: { en: "Family Fantasy Cup", ar: "كأس الفانتازي العائلي" },
    rank: 1,
    total: 298,
    code: "FAM456",
    members: 6,
  },
];

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export function LeaguesClient() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const lang = isRTL ? "ar" : "en";

  const [showCount, setShowCount] = useState(10);
  const [createName, setCreateName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCreate = () => {
    if (!createName.trim()) return;
    setCreatedCode(generateCode());
  };

  const handleJoin = () => {
    if (!joinCode.trim()) return;
    setJoinSuccess(true);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container py-6">
        {/* Header */}
        <div className="mb-6">
          <Badge className="mb-1 bg-emerald-600 text-white">BFL Fantasy</Badge>
          <h1 className="text-2xl font-bold">
            {isRTL ? "الدوريات" : "Leagues"}
          </h1>
        </div>

        <Tabs defaultValue="global">
          <TabsList className="mb-6 w-full">
            <TabsTrigger value="global" className="flex-1">
              <Trophy className="me-1.5 h-4 w-4" />
              {isRTL ? "الترتيب العام" : "Global"}
            </TabsTrigger>
            <TabsTrigger value="my" className="flex-1">
              <Users className="me-1.5 h-4 w-4" />
              {isRTL ? "دورياتي" : "My Leagues"}
            </TabsTrigger>
            <TabsTrigger value="create" className="flex-1">
              <Plus className="me-1.5 h-4 w-4" />
              {isRTL ? "إنشاء/انضمام" : "Create/Join"}
            </TabsTrigger>
          </TabsList>

          {/* ── Global Tab ─────────────────────────────────── */}
          <TabsContent value="global">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {isRTL ? "الترتيب العالمي" : "Global Leaderboard"}
                </CardTitle>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50 text-muted-foreground text-xs">
                      <th className="px-4 py-3 text-start font-medium">
                        {isRTL ? "الترتيب" : "Rank"}
                      </th>
                      <th className="px-4 py-3 text-start font-medium">
                        {isRTL ? "المدير" : "Manager"}
                      </th>
                      <th className="px-4 py-3 text-start font-medium hidden sm:table-cell">
                        {isRTL ? "الفريق" : "Team"}
                      </th>
                      <th className="px-4 py-3 text-end font-medium">
                        {isRTL ? "نقاط الجولة" : "GW"}
                      </th>
                      <th className="px-4 py-3 text-end font-medium">
                        {isRTL ? "المجموع" : "Total"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {globalLeaderboard.slice(0, showCount).map((entry) => (
                      <tr
                        key={entry.rank}
                        className="border-b border-border/50 hover:bg-muted/30"
                      >
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                              entry.rank === 1
                                ? "bg-yellow-400 text-yellow-900"
                                : entry.rank === 2
                                ? "bg-slate-300 text-slate-800"
                                : entry.rank === 3
                                ? "bg-amber-600 text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {entry.rank}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium">{entry.user}</td>
                        <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                          {entry.team_name}
                        </td>
                        <td className="px-4 py-3 text-end font-bold text-emerald-600">
                          {entry.gw_points}
                        </td>
                        <td className="px-4 py-3 text-end font-bold">
                          {entry.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {showCount < globalLeaderboard.length && (
                <div className="px-4 py-3 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCount((c) => c + 10)}
                  >
                    {isRTL ? "تحميل المزيد" : "Load More"}
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* ── My Leagues Tab ─────────────────────────────── */}
          <TabsContent value="my">
            <div className="flex flex-col gap-4">
              {MY_LEAGUES_MOCK.map((league) => (
                <Card key={league.id}>
                  <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-bold">{league.name[lang]}</h3>
                      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <span>
                          {isRTL ? "الكود" : "Code"}:{" "}
                          <span className="font-mono font-semibold">{league.code}</span>
                        </span>
                        <span>
                          {isRTL ? `${league.members} أعضاء` : `${league.members} members`}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">
                          {isRTL ? "ترتيبي" : "My Rank"}
                        </p>
                        <p className="text-lg font-extrabold text-emerald-600">
                          #{league.rank}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">
                          {isRTL ? "نقاطي" : "My Total"}
                        </p>
                        <p className="text-lg font-extrabold">{league.total}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ── Create/Join Tab ────────────────────────────── */}
          <TabsContent value="create">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Create */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Plus className="h-4 w-4 text-emerald-600" />
                    {isRTL ? "إنشاء دوري" : "Create a League"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {!createdCode ? (
                    <>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="league-name">
                          {isRTL ? "اسم الدوري" : "League Name"}
                        </Label>
                        <Input
                          id="league-name"
                          value={createName}
                          onChange={(e) => setCreateName(e.target.value)}
                          placeholder={isRTL ? "مثال: دوري الأصدقاء" : "e.g. Friends League"}
                        />
                      </div>
                      <Button
                        className="bg-emerald-600 text-white hover:bg-emerald-700"
                        disabled={!createName.trim()}
                        onClick={handleCreate}
                      >
                        {isRTL ? "إنشاء الدوري" : "Create League"}
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-2 text-center">
                      <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                      <p className="font-bold text-emerald-600">
                        {isRTL ? "تم إنشاء الدوري!" : "League Created!"}
                      </p>
                      <p className="text-sm text-muted-foreground">{createName}</p>
                      <div className="flex items-center gap-2 rounded-lg border border-border bg-muted px-4 py-2">
                        <span className="font-mono text-xl font-black tracking-widest">
                          {createdCode}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => copyCode(createdCode)}
                        >
                          {copied ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {isRTL
                          ? "شارك هذا الكود مع أصدقائك للانضمام"
                          : "Share this code with friends to join"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Join */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Users className="h-4 w-4 text-blue-500" />
                    {isRTL ? "الانضمام لدوري" : "Join a League"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {!joinSuccess ? (
                    <>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="join-code">
                          {isRTL ? "كود الدوري" : "League Code"}
                        </Label>
                        <Input
                          id="join-code"
                          value={joinCode}
                          onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                          placeholder="ABC123"
                          className="font-mono tracking-widest uppercase"
                          maxLength={6}
                        />
                      </div>
                      <Button
                        variant="outline"
                        disabled={joinCode.length < 4}
                        onClick={handleJoin}
                      >
                        {isRTL ? "انضم للدوري" : "Join League"}
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-2 text-center">
                      <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                      <p className="font-bold text-emerald-600">
                        {isRTL ? "انضممت بنجاح!" : "Successfully Joined!"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isRTL
                          ? `انضممت للدوري برمز ${joinCode}`
                          : `You've joined the league with code ${joinCode}`}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setJoinSuccess(false);
                          setJoinCode("");
                        }}
                      >
                        {isRTL ? "انضم لدوري آخر" : "Join Another"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
