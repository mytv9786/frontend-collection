import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  CreditCard,
  Plus,
  Search,
  Filter,
  Download,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  Clock,
  Bell,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  Wallet,
  Building2,
  Mail,
  Phone,
  IndianRupee,
  Smartphone,
  Landmark,
  Banknote,
  ArrowLeft,
  ArrowRight as ArrowRightIcon,
  Sparkles,
  Check,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

/* ------------------------------------------------------------------ */
/* Mock data                                                          */
/* ------------------------------------------------------------------ */

const MANAGERS = [
  {
    id: 1,
    name: 'Ananya Rao',
    initials: 'AR',
    email: 'ananya.rao@finflow.app',
    customers: 24,
    collected: 842000,
    status: 'active',
  },
  {
    id: 2,
    name: 'Vikram Sethi',
    initials: 'VS',
    email: 'vikram.sethi@finflow.app',
    customers: 18,
    collected: 615000,
    status: 'active',
  },
  {
    id: 3,
    name: 'Priya Menon',
    initials: 'PM',
    email: 'priya.menon@finflow.app',
    customers: 31,
    collected: 1120000,
    status: 'active',
  },
  {
    id: 4,
    name: 'Rahul Kapoor',
    initials: 'RK',
    email: 'rahul.kapoor@finflow.app',
    customers: 12,
    collected: 398000,
    status: 'inactive',
  },
  {
    id: 5,
    name: 'Sneha Iyer',
    initials: 'SI',
    email: 'sneha.iyer@finflow.app',
    customers: 27,
    collected: 934000,
    status: 'active',
  },
];

const CUSTOMERS = [
  {
    id: 1,
    name: 'Rohan Malhotra',
    manager: 'Ananya Rao',
    paid: 45000,
    due: 12000,
    status: 'due',
  },
  {
    id: 2,
    name: 'Kavya Reddy',
    manager: 'Priya Menon',
    paid: 78000,
    due: 0,
    status: 'paid',
  },
  {
    id: 3,
    name: 'Arjun Nair',
    manager: 'Vikram Sethi',
    paid: 23000,
    due: 8500,
    status: 'due',
  },
  {
    id: 4,
    name: 'Ishita Bansal',
    manager: 'Sneha Iyer',
    paid: 56000,
    due: 0,
    status: 'paid',
  },
  {
    id: 5,
    name: 'Karthik Subramaniam',
    manager: 'Priya Menon',
    paid: 31000,
    due: 19500,
    status: 'overdue',
  },
  {
    id: 6,
    name: 'Meera Pillai',
    manager: 'Ananya Rao',
    paid: 67000,
    due: 0,
    status: 'paid',
  },
];

const PAYMENTS = [
  {
    id: 'PMT-8841',
    customer: 'Rohan Malhotra',
    manager: 'Ananya Rao',
    amount: 12000,
    date: '12 Aug 2026',
    method: 'UPI',
    status: 'paid',
  },
  {
    id: 'PMT-8840',
    customer: 'Karthik Subramaniam',
    manager: 'Priya Menon',
    amount: 19500,
    date: '11 Aug 2026',
    method: 'Bank Transfer',
    status: 'overdue',
  },
  {
    id: 'PMT-8839',
    customer: 'Kavya Reddy',
    manager: 'Priya Menon',
    amount: 78000,
    date: '10 Aug 2026',
    method: 'Card',
    status: 'paid',
  },
  {
    id: 'PMT-8838',
    customer: 'Arjun Nair',
    manager: 'Vikram Sethi',
    amount: 8500,
    date: '09 Aug 2026',
    method: 'UPI',
    status: 'due',
  },
  {
    id: 'PMT-8837',
    customer: 'Ishita Bansal',
    manager: 'Sneha Iyer',
    amount: 56000,
    date: '08 Aug 2026',
    method: 'Cash',
    status: 'paid',
  },
  {
    id: 'PMT-8836',
    customer: 'Meera Pillai',
    manager: 'Ananya Rao',
    amount: 67000,
    date: '07 Aug 2026',
    method: 'Card',
    status: 'paid',
  },
];

const COLLECTION_DATA = [
  { month: 'Feb', collected: 520000, due: 180000 },
  { month: 'Mar', collected: 610000, due: 150000 },
  { month: 'Apr', collected: 580000, due: 210000 },
  { month: 'May', collected: 720000, due: 130000 },
  { month: 'Jun', collected: 690000, due: 170000 },
  { month: 'Jul', collected: 810000, due: 120000 },
  { month: 'Aug', collected: 865000, due: 95000 },
];

const STATUS_DATA = [
  { name: 'Paid', value: 68, color: '#29D7A8' },
  { name: 'Due', value: 22, color: '#F6A94D' },
  { name: 'Overdue', value: 10, color: '#F1637A' },
];

const TOTAL_AMOUNT = 2909000;
const PAID_AMOUNT = 2245500;
const DUE_AMOUNT = TOTAL_AMOUNT - PAID_AMOUNT;

/* ------------------------------------------------------------------ */
/* Utilities                                                          */
/* ------------------------------------------------------------------ */

function formatINR(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

function AnimatedNumber({ value, prefix = '₹', duration = 1100 }) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(null);
  const fromRef = useRef(0);

  useEffect(() => {
    fromRef.current = display;
    startRef.current = null;
    let raf;
    function step(ts) {
      if (startRef.current === null) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(fromRef.current + (value - fromRef.current) * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span>
      {prefix}
      {Math.round(display).toLocaleString('en-IN')}
    </span>
  );
}

/* Mouse-tracked 3D tilt wrapper */
function TiltCard({ children, className = '', style = {}, floatDelay = 0 }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, active: false });

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 14;
    const rx = (0.5 - py) * 14;
    setTilt({ rx, ry, active: true });
  }
  function onLeave() {
    setTilt({ rx: 0, ry: 0, active: false });
  }

  return (
    <div
      className={`tilt-outer ${className}`}
      style={{ animationDelay: `${floatDelay}ms`, ...style }}
    >
      <div
        ref={ref}
        className={`tilt-inner ${tilt.active ? 'tilt-active' : ''}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function FloatingBackground() {
  return (
    <div className="floating-bg" aria-hidden="true">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <div className="ring ring-a" />
      <div className="ring ring-b" />
      <div className="grid-plane" />
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    paid: { label: 'Paid', cls: 'badge-green', Icon: CheckCircle2 },
    due: { label: 'Due', cls: 'badge-amber', Icon: Clock },
    overdue: { label: 'Overdue', cls: 'badge-red', Icon: AlertCircle },
    active: { label: 'Active', cls: 'badge-green', Icon: CheckCircle2 },
    inactive: { label: 'Inactive', cls: 'badge-muted', Icon: Clock },
  };
  const { label, cls, Icon } = map[status] || map.due;
  return (
    <span className={`badge ${cls}`}>
      <Icon size={12} strokeWidth={2.5} />
      {label}
    </span>
  );
}

function Avatar({ initials, tone = 'indigo' }) {
  return <div className={`avatar avatar-${tone}`}>{initials}</div>;
}

/* ------------------------------------------------------------------ */
/* Layout pieces                                                      */
/* ------------------------------------------------------------------ */

const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  {
    key: 'managers',
    label: 'Managers',
    icon: Users,
    children: [
      { key: 'managersList', label: 'Managers List' },
      { key: 'addManager', label: 'Add Manager' },
    ],
  },
  {
    key: 'customers',
    label: 'Customers',
    icon: Building2,
    children: [
      { key: 'customersList', label: 'Customers List' },
      { key: 'addCustomer', label: 'Add Customer' },
    ],
  },
  {
    key: 'payments',
    label: 'Payments',
    icon: CreditCard,
    children: [
      { key: 'paymentsList', label: 'Payments List' },
      { key: 'addPayment', label: 'Add Payment' },
    ],
  },
];

function Sidebar({ view, setView, collapsed, mobileOpen, setMobileOpen }) {
  const [openGroups, setOpenGroups] = useState({
    managers: true,
    customers: false,
    payments: false,
  });

  function isChildActive(item) {
    return item.children?.some(c => c.key === view);
  }

  return (
    <>
      {mobileOpen && (
        <div className="drawer-scrim" onClick={() => setMobileOpen(false)} />
      )}
      <aside
        className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''} ${
          mobileOpen ? 'sidebar-mobile-open' : ''
        }`}
      >
        <div className="sidebar-brand">
          <div className="brand-mark">
            <Sparkles size={16} strokeWidth={2.5} />
          </div>
          {!collapsed && <span className="brand-text">FinFlow</span>}
        </div>

        <nav className="sidebar-nav">
          {NAV.map(item => {
            const Icon = item.icon;
            const activeParent =
              item.key === 'dashboard'
                ? view === 'dashboard'
                : isChildActive(item);
            return (
              <div key={item.key} className="nav-group">
                <button
                  className={`nav-item ${
                    activeParent ? 'nav-item-active' : ''
                  }`}
                  onClick={() => {
                    if (item.children) {
                      setOpenGroups(g => ({ ...g, [item.key]: !g[item.key] }));
                    } else {
                      setView(item.key);
                      setMobileOpen(false);
                    }
                  }}
                >
                  <Icon size={18} strokeWidth={2} className="nav-icon" />
                  {!collapsed && (
                    <span className="nav-label">{item.label}</span>
                  )}
                  {!collapsed && item.children && (
                    <ChevronDown
                      size={14}
                      className={`nav-chevron ${
                        openGroups[item.key] ? 'nav-chevron-open' : ''
                      }`}
                    />
                  )}
                  {activeParent && <span className="nav-glow" />}
                </button>
                {!collapsed && item.children && openGroups[item.key] && (
                  <div className="nav-submenu">
                    {item.children.map(c => (
                      <button
                        key={c.key}
                        className={`nav-subitem ${
                          view === c.key ? 'nav-subitem-active' : ''
                        }`}
                        onClick={() => {
                          setView(c.key);
                          setMobileOpen(false);
                        }}
                      >
                        <span className="nav-dot" />
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          {!collapsed && (
            <div className="sidebar-upsell">
              <Wallet size={16} />
              <div>
                <div className="upsell-title">Settlement window</div>
                <div className="upsell-sub">Closes in 3d 14h</div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

function Header({ onMenuClick, title, subtitle }) {
  return (
    <header className="glass-header">
      <div className="header-left">
        <button
          className="icon-btn"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu size={19} />
        </button>
        <div>
          <div className="header-crumb">FinFlow / {title}</div>
          <h1 className="header-title">{subtitle}</h1>
        </div>
      </div>
      <div className="header-right">
        <button className="icon-btn icon-btn-bell">
          <Bell size={18} />
          <span className="bell-pulse" />
        </button>
        <button className="profile-btn">
          <div className="avatar avatar-indigo profile-avatar">AD</div>
          <div className="profile-meta">
            <div className="profile-name">Admin</div>
            <div className="profile-role">Super Admin</div>
          </div>
          <ChevronDown size={14} className="profile-chevron" />
        </button>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard view                                                     */
/* ------------------------------------------------------------------ */

function KpiCard({ icon: Icon, label, value, delta, tone, floatDelay }) {
  const positive = delta >= 0;
  return (
    <TiltCard floatDelay={floatDelay}>
      <div className={`kpi-card kpi-${tone}`}>
        <div className="kpi-glow" />
        <div className="kpi-top">
          <div className={`kpi-icon kpi-icon-${tone}`}>
            <Icon size={18} strokeWidth={2.2} />
          </div>
          <div className={`kpi-delta ${positive ? 'delta-up' : 'delta-down'}`}>
            {positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {Math.abs(delta)}%
          </div>
        </div>
        <div className="kpi-label">{label}</div>
        <div className="kpi-value">
          <AnimatedNumber value={value} />
        </div>
        <div className="kpi-sparkline">
          {[4, 7, 5, 9, 6, 10, 8, 12].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h * 3}px`, animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
      </div>
    </TiltCard>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="tooltip-month">{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} className="tooltip-row">
          <span className="tooltip-dot" style={{ background: p.color }} />
          {p.name}: <strong>{formatINR(p.value)}</strong>
        </div>
      ))}
    </div>
  );
}

function DashboardView() {
  return (
    <>
      <div className="hero-panel">
        <FloatingBackground />
        <div className="hero-content">
          <div className="hero-eyebrow">
            Good morning, Admin <span className="wave">👋</span>
          </div>
          <h2 className="hero-title">
            ₹{(TOTAL_AMOUNT / 100000).toFixed(1)}L moved through your books this
            month
          </h2>
          <p className="hero-sub">
            Collections are trending up 12.4% versus last month across 5
            managers and 6 active customers.
          </p>
        </div>
      </div>

      <div className="kpi-grid">
        <KpiCard
          icon={IndianRupee}
          label="Total"
          value={TOTAL_AMOUNT}
          delta={12.4}
          tone="indigo"
          floatDelay={0}
        />
        <KpiCard
          icon={CheckCircle2}
          label="Paid"
          value={PAID_AMOUNT}
          delta={8.1}
          tone="green"
          floatDelay={120}
        />
        <KpiCard
          icon={Clock}
          label="Due"
          value={DUE_AMOUNT}
          delta={-4.6}
          tone="amber"
          floatDelay={240}
        />
      </div>

      <div className="charts-grid">
        <TiltCard className="chart-card-outer">
          <div className="panel chart-card">
            <div className="panel-head">
              <div>
                <div className="panel-title">Payment Collection</div>
                <div className="panel-sub">Monthly collected vs. due</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={230}>
              <AreaChart
                data={COLLECTION_DATA}
                margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="gradCollected"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#6C7CFF" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#6C7CFF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradDue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F6A94D" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#F6A94D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke="rgba(255,255,255,0.06)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#8A93AC', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#8A93AC', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => `${v / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="collected"
                  name="Collected"
                  stroke="#6C7CFF"
                  strokeWidth={2.5}
                  fill="url(#gradCollected)"
                  animationDuration={900}
                />
                <Area
                  type="monotone"
                  dataKey="due"
                  name="Due"
                  stroke="#F6A94D"
                  strokeWidth={2}
                  fill="url(#gradDue)"
                  animationDuration={900}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TiltCard>

        <TiltCard className="chart-card-outer">
          <div className="panel chart-card">
            <div className="panel-head">
              <div>
                <div className="panel-title">Payment Status</div>
                <div className="panel-sub">Share of total volume</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={STATUS_DATA}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={82}
                  paddingAngle={4}
                  animationDuration={900}
                  stroke="none"
                >
                  {STATUS_DATA.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0];
                    return (
                      <div className="chart-tooltip">
                        <div className="tooltip-row">
                          <span
                            className="tooltip-dot"
                            style={{ background: d.payload.color }}
                          />
                          {d.name}: <strong>{d.value}%</strong>
                        </div>
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="legend-row">
              {STATUS_DATA.map(d => (
                <div key={d.name} className="legend-item">
                  <span
                    className="legend-dot"
                    style={{ background: d.color }}
                  />
                  {d.name} <strong>{d.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </TiltCard>
      </div>

      <div className="panel table-panel">
        <div className="panel-head">
          <div>
            <div className="panel-title">Recent Payments</div>
            <div className="panel-sub">
              Latest transactions across all managers
            </div>
          </div>
          <button className="btn-3d btn-ghost">
            <Download size={14} /> Export
          </button>
        </div>
        <PaymentsTable rows={PAYMENTS} compact />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Shared table                                                       */
/* ------------------------------------------------------------------ */

function PaymentsTable({ rows, compact }) {
  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Customer</th>
            <th>Manager</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Method</th>
            <th>Status</th>
            {!compact && <th></th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.id}
              className="data-row"
              style={{ animationDelay: `${i * 55}ms` }}
            >
              <td className="mono">{r.id}</td>
              <td>
                <div className="cell-person">
                  <Avatar
                    initials={r.customer
                      .split(' ')
                      .map(s => s[0])
                      .slice(0, 2)
                      .join('')}
                    tone="indigo"
                  />
                  {r.customer}
                </div>
              </td>
              <td className="text-dim">{r.manager}</td>
              <td className="mono">{formatINR(r.amount)}</td>
              <td className="text-dim">{r.date}</td>
              <td className="text-dim">{r.method}</td>
              <td>
                <StatusBadge status={r.status} />
              </td>
              {!compact && (
                <td>
                  <button className="row-action">
                    <MoreVertical size={15} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ListToolbar({ placeholder, actionLabel, onAction }) {
  return (
    <div className="list-toolbar">
      <div className="search-field">
        <Search size={15} />
        <input placeholder={placeholder} />
      </div>
      <button className="btn-3d btn-ghost">
        <Filter size={14} /> Filters
      </button>
      <button className="btn-3d btn-primary" onClick={onAction}>
        <Plus size={15} /> {actionLabel}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Managers                                                            */
/* ------------------------------------------------------------------ */

function ManagersListView({ goAdd }) {
  return (
    <div className="panel table-panel fade-in-up">
      <div className="panel-head">
        <div>
          <div className="panel-title">Managers</div>
          <div className="panel-sub">
            {MANAGERS.length} team members managing collections
          </div>
        </div>
      </div>
      <ListToolbar
        placeholder="Search managers…"
        actionLabel="Add Manager"
        onAction={goAdd}
      />
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>Manager</th>
              <th>Email</th>
              <th>Customers</th>
              <th>Collected</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {MANAGERS.map((m, i) => (
              <tr
                key={m.id}
                className="data-row"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <td>
                  <div className="cell-person">
                    <Avatar initials={m.initials} tone="green" />
                    {m.name}
                  </div>
                </td>
                <td className="text-dim">{m.email}</td>
                <td>{m.customers}</td>
                <td className="mono">{formatINR(m.collected)}</td>
                <td>
                  <StatusBadge status={m.status} />
                </td>
                <td>
                  <button className="row-action">
                    <MoreVertical size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FormField({ label, icon: Icon, ...props }) {
  return (
    <label className="form-field">
      <span className="form-label">{label}</span>
      <div className="form-input-wrap">
        {Icon && <Icon size={15} className="form-icon" />}
        <input className="form-input" {...props} />
      </div>
    </label>
  );
}

function AddManagerView({ goList }) {
  return (
    <div className="form-panel fade-in-up">
      <div className="panel-head">
        <div>
          <div className="panel-title">Add Manager</div>
          <div className="panel-sub">Onboard a new collections manager</div>
        </div>
      </div>
      <div className="form-grid">
        <FormField
          label="Full name"
          icon={Users}
          placeholder="e.g. Divya Krishnan"
        />
        <FormField
          label="Email address"
          icon={Mail}
          placeholder="name@finflow.app"
          type="email"
        />
        <FormField
          label="Phone number"
          icon={Phone}
          placeholder="+91 98765 43210"
        />
        <FormField
          label="Region"
          icon={Building2}
          placeholder="e.g. South Zone"
        />
      </div>
      <div className="form-actions">
        <button className="btn-3d btn-ghost" onClick={goList}>
          Cancel
        </button>
        <button className="btn-3d btn-primary" onClick={goList}>
          <Check size={15} /> Save Manager
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Customers                                                          */
/* ------------------------------------------------------------------ */

function CustomersListView({ goAdd }) {
  return (
    <div className="panel table-panel fade-in-up">
      <div className="panel-head">
        <div>
          <div className="panel-title">Customers</div>
          <div className="panel-sub">
            {CUSTOMERS.length} customers across all managers
          </div>
        </div>
      </div>
      <ListToolbar
        placeholder="Search customers…"
        actionLabel="Add Customer"
        onAction={goAdd}
      />
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Manager</th>
              <th>Paid</th>
              <th>Due</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c, i) => (
              <tr
                key={c.id}
                className="data-row"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <td>
                  <div className="cell-person">
                    <Avatar
                      initials={c.name
                        .split(' ')
                        .map(s => s[0])
                        .slice(0, 2)
                        .join('')}
                      tone="amber"
                    />
                    {c.name}
                  </div>
                </td>
                <td>
                  <span className="manager-tag">{c.manager}</span>
                </td>
                <td className="mono">{formatINR(c.paid)}</td>
                <td className="mono">{c.due ? formatINR(c.due) : '—'}</td>
                <td>
                  <StatusBadge status={c.status} />
                </td>
                <td>
                  <button className="row-action">
                    <MoreVertical size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddCustomerView({ goList }) {
  const [total, setTotal] = useState('');
  const [paid, setPaid] = useState('');
  const due = Math.max(0, (parseFloat(total) || 0) - (parseFloat(paid) || 0));

  return (
    <div className="form-panel fade-in-up">
      <div className="panel-head">
        <div>
          <div className="panel-title">Add Customer</div>
          <div className="panel-sub">
            Due amount auto-calculates from total and paid
          </div>
        </div>
      </div>
      <div className="form-grid">
        <FormField
          label="Customer name"
          icon={Users}
          placeholder="e.g. Nikhil Chawla"
        />
        <FormField
          label="Assigned manager"
          icon={UserPlus}
          placeholder="e.g. Ananya Rao"
        />
        <FormField
          label="Total amount (₹)"
          icon={IndianRupee}
          placeholder="0"
          type="number"
          value={total}
          onChange={e => setTotal(e.target.value)}
        />
        <FormField
          label="Paid amount (₹)"
          icon={IndianRupee}
          placeholder="0"
          type="number"
          value={paid}
          onChange={e => setPaid(e.target.value)}
        />
      </div>
      <div className="due-preview">
        <span>Due amount</span>
        <strong className={due > 0 ? 'due-amount-warn' : ''}>
          <AnimatedNumber value={due} duration={400} />
        </strong>
      </div>
      <div className="form-actions">
        <button className="btn-3d btn-ghost" onClick={goList}>
          Cancel
        </button>
        <button className="btn-3d btn-primary" onClick={goList}>
          <Check size={15} /> Save Customer
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Payments                                                            */
/* ------------------------------------------------------------------ */

function PaymentsListView({ goAdd }) {
  return (
    <div className="panel table-panel fade-in-up">
      <div className="panel-head">
        <div>
          <div className="panel-title">Payments</div>
          <div className="panel-sub">
            {PAYMENTS.length} transactions recorded
          </div>
        </div>
      </div>
      <ListToolbar
        placeholder="Search payments…"
        actionLabel="Add Payment"
        onAction={goAdd}
      />
      <PaymentsTable rows={PAYMENTS} />
    </div>
  );
}

const METHODS = [
  { key: 'upi', label: 'UPI', icon: Smartphone },
  { key: 'card', label: 'Card', icon: CreditCard },
  { key: 'bank', label: 'Bank Transfer', icon: Landmark },
  { key: 'cash', label: 'Cash', icon: Banknote },
];

function AddPaymentView({ goList }) {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState(null);
  const [customer, setCustomer] = useState(CUSTOMERS[0].name);
  const [amount, setAmount] = useState('');

  const steps = ['Customer', 'Payment Method', 'Review'];

  return (
    <div className="form-panel fade-in-up">
      <div className="panel-head">
        <div>
          <div className="panel-title">Add Payment</div>
          <div className="panel-sub">
            Record a new transaction in three steps
          </div>
        </div>
      </div>

      <div className="step-indicator">
        {steps.map((s, i) => {
          const n = i + 1;
          const state = n === step ? 'current' : n < step ? 'done' : 'todo';
          return (
            <React.Fragment key={s}>
              <div className={`step-dot step-${state}`}>
                {state === 'done' ? <Check size={13} /> : n}
                <span className="step-label">{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`step-line ${n < step ? 'step-line-done' : ''}`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="step-body">
        {step === 1 && (
          <div className="form-grid">
            <label className="form-field">
              <span className="form-label">Customer</span>
              <div className="form-input-wrap">
                <Users size={15} className="form-icon" />
                <select
                  className="form-input"
                  value={customer}
                  onChange={e => setCustomer(e.target.value)}
                >
                  {CUSTOMERS.map(c => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <FormField
              label="Amount (₹)"
              icon={IndianRupee}
              placeholder="0"
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
        )}

        {step === 2 && (
          <div className="method-grid">
            {METHODS.map(m => {
              const Icon = m.icon;
              const selected = method === m.key;
              return (
                <button
                  key={m.key}
                  className={`method-card ${
                    selected ? 'method-card-selected' : ''
                  }`}
                  onClick={() => setMethod(m.key)}
                >
                  <div className="method-flip">
                    <Icon size={22} strokeWidth={1.8} />
                    <span>{m.label}</span>
                    {selected && (
                      <div className="method-check">
                        <Check size={12} />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {step === 3 && (
          <div className="review-card">
            <div className="review-row">
              <span>Customer</span>
              <strong>{customer}</strong>
            </div>
            <div className="review-row">
              <span>Amount</span>
              <strong>{formatINR(parseFloat(amount) || 0)}</strong>
            </div>
            <div className="review-row">
              <span>Method</span>
              <strong>
                {METHODS.find(m => m.key === method)?.label || '—'}
              </strong>
            </div>
            <div className="review-row">
              <span>Status</span>
              <StatusBadge status="paid" />
            </div>
          </div>
        )}
      </div>

      <div className="form-actions">
        {step > 1 ? (
          <button
            className="btn-3d btn-ghost"
            onClick={() => setStep(s => s - 1)}
          >
            <ArrowLeft size={14} /> Back
          </button>
        ) : (
          <button className="btn-3d btn-ghost" onClick={goList}>
            Cancel
          </button>
        )}
        {step < 3 ? (
          <button
            className="btn-3d btn-primary"
            onClick={() => setStep(s => s + 1)}
          >
            Continue <ArrowRightIcon size={14} />
          </button>
        ) : (
          <button className="btn-3d btn-primary" onClick={goList}>
            <Check size={15} /> Confirm Payment
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App shell                                                          */
/* ------------------------------------------------------------------ */

const TITLES = {
  dashboard: ['Overview', 'Dashboard'],
  managersList: ['Managers', 'Managers List'],
  addManager: ['Managers', 'Add Manager'],
  customersList: ['Customers', 'Customers List'],
  addCustomer: ['Customers', 'Add Customer'],
  paymentsList: ['Payments', 'Payments List'],
  addPayment: ['Payments', 'Add Payment'],
};

export default function App() {
  const [view, setView] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [title, subtitle] = TITLES[view];

  return (
    <div className="app-root">
      <style>{CSS}</style>
      <Sidebar
        view={view}
        setView={setView}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className={`app-main ${collapsed ? 'app-main-collapsed' : ''}`}>
        <Header
          onMenuClick={() => {
            if (window.innerWidth <= 900) setMobileOpen(v => !v);
            else setCollapsed(v => !v);
          }}
          title={title}
          subtitle={subtitle}
        />
        <main className="content">
          {view === 'dashboard' && <DashboardView />}
          {view === 'managersList' && (
            <ManagersListView goAdd={() => setView('addManager')} />
          )}
          {view === 'addManager' && (
            <AddManagerView goList={() => setView('managersList')} />
          )}
          {view === 'customersList' && (
            <CustomersListView goAdd={() => setView('addCustomer')} />
          )}
          {view === 'addCustomer' && (
            <AddCustomerView goList={() => setView('customersList')} />
          )}
          {view === 'paymentsList' && (
            <PaymentsListView goAdd={() => setView('addPayment')} />
          )}
          {view === 'addPayment' && (
            <AddPaymentView goList={() => setView('paymentsList')} />
          )}
        </main>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                             */
/* ------------------------------------------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap');

.app-root {
  --bg: #080B13;
  --bg-elevated: #0D1220;
  --glass: rgba(255,255,255,0.035);
  --glass-strong: rgba(255,255,255,0.06);
  --glass-border: rgba(255,255,255,0.09);
  --text: #EAEDF6;
  --text-dim: #8A93AC;
  --text-faint: #4E566E;
  --indigo: #6C7CFF;
  --indigo-soft: rgba(108,124,255,0.16);
  --green: #29D7A8;
  --green-soft: rgba(41,215,168,0.14);
  --amber: #F6A94D;
  --amber-soft: rgba(246,169,77,0.14);
  --red: #F1637A;
  --red-soft: rgba(241,99,122,0.14);
  --radius: 18px;
  --radius-sm: 12px;
  font-family: 'Inter', sans-serif;
  color: var(--text);
  background: var(--bg);
  min-height: 100vh;
  position: relative;
  display: flex;
  overflow-x: hidden;
}

.app-root * { box-sizing: border-box; }
.app-root h1, .app-root h2, .app-root .num-face { font-family: 'Plus Jakarta Sans', sans-serif; }

.app-root::before {
  content: '';
  position: fixed; inset: 0;
  background:
    radial-gradient(ellipse 900px 600px at 15% -10%, rgba(108,124,255,0.14), transparent 60%),
    radial-gradient(ellipse 700px 500px at 100% 10%, rgba(41,215,168,0.08), transparent 60%);
  pointer-events: none; z-index: 0;
}

/* ---------- Sidebar ---------- */
.sidebar {
  width: 248px; flex-shrink: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015));
  backdrop-filter: blur(20px);
  border-right: 1px solid var(--glass-border);
  display: flex; flex-direction: column;
  height: 100vh; position: sticky; top: 0; z-index: 20;
  transition: width 0.35s cubic-bezier(.4,0,.2,1);
  padding: 18px 14px;
}
.sidebar-collapsed { width: 78px; }
.sidebar-brand { display: flex; align-items: center; gap: 10px; padding: 6px 8px 22px; }
.brand-mark {
  width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
  background: linear-gradient(135deg, var(--indigo), #9C6CFF);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 18px rgba(108,124,255,0.45), inset 0 1px 0 rgba(255,255,255,0.3);
  animation: floatY 4s ease-in-out infinite;
}
.brand-text { font-weight: 700; font-size: 17px; letter-spacing: -0.02em; }

.sidebar-nav { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; }
.nav-group { display: flex; flex-direction: column; }
.nav-item {
  position: relative; display: flex; align-items: center; gap: 11px;
  padding: 10px 12px; border-radius: var(--radius-sm); border: none;
  background: transparent; color: var(--text-dim); font-size: 13.5px; font-weight: 500;
  cursor: pointer; width: 100%; text-align: left;
  transition: all 0.25s cubic-bezier(.4,0,.2,1);
}
.nav-item:hover { background: var(--glass-strong); color: var(--text); transform: translateX(2px); }
.nav-item-active { color: var(--text); background: var(--indigo-soft); }
.nav-icon { flex-shrink: 0; }
.nav-label { flex: 1; }
.nav-chevron { transition: transform 0.25s; opacity: 0.6; }
.nav-chevron-open { transform: rotate(180deg); }
.nav-glow {
  position: absolute; left: 0; top: 8%; height: 84%; width: 3px; border-radius: 3px;
  background: linear-gradient(180deg, var(--indigo), var(--green));
  box-shadow: 0 0 10px var(--indigo);
}
.nav-submenu {
  display: flex; flex-direction: column; margin: 2px 0 4px 30px; gap: 1px;
  border-left: 1px solid var(--glass-border); padding-left: 12px;
  animation: slideDown 0.25s cubic-bezier(.4,0,.2,1);
}
.nav-subitem {
  display: flex; align-items: center; gap: 8px; padding: 7px 8px; border-radius: 8px;
  background: transparent; border: none; color: var(--text-faint); font-size: 12.8px;
  cursor: pointer; text-align: left; transition: all 0.2s;
}
.nav-subitem:hover { color: var(--text); background: var(--glass); }
.nav-subitem-active { color: var(--indigo); font-weight: 600; }
.nav-dot { width: 4px; height: 4px; border-radius: 50%; background: currentColor; }

.sidebar-footer { padding-top: 12px; }
.sidebar-upsell {
  display: flex; align-items: center; gap: 10px; padding: 12px; border-radius: var(--radius-sm);
  background: var(--glass-strong); border: 1px solid var(--glass-border); color: var(--green);
}
.upsell-title { font-size: 12px; font-weight: 600; color: var(--text); }
.upsell-sub { font-size: 11px; color: var(--text-faint); }

.drawer-scrim { display: none; }

/* ---------- Header ---------- */
.app-main { flex: 1; min-width: 0; position: relative; z-index: 1; }
.glass-header {
  position: sticky; top: 0; z-index: 15; display: flex; align-items: center; justify-content: space-between;
  padding: 14px 28px; background: rgba(8,11,19,0.72); backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--glass-border);
}
.header-left { display: flex; align-items: center; gap: 16px; }
.header-crumb { font-size: 11.5px; color: var(--text-faint); text-transform: uppercase; letter-spacing: 0.06em; }
.header-title { font-size: 19px; font-weight: 700; margin: 2px 0 0; letter-spacing: -0.01em; }
.header-right { display: flex; align-items: center; gap: 10px; }
.icon-btn {
  width: 38px; height: 38px; border-radius: 11px; border: 1px solid var(--glass-border);
  background: var(--glass); color: var(--text-dim); display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.2s;
}
.icon-btn:hover { color: var(--text); background: var(--glass-strong); transform: translateY(-1px); }
.icon-btn-bell { position: relative; }
.bell-pulse {
  position: absolute; top: 8px; right: 9px; width: 7px; height: 7px; border-radius: 50%;
  background: var(--red); box-shadow: 0 0 0 0 rgba(241,99,122,0.6);
  animation: pulseRing 2s infinite;
}
.profile-btn {
  display: flex; align-items: center; gap: 9px; padding: 5px 10px 5px 5px; border-radius: 30px;
  background: var(--glass); border: 1px solid var(--glass-border); cursor: pointer; transition: all 0.25s;
}
.profile-btn:hover { background: var(--glass-strong); }
.profile-avatar { width: 30px; height: 30px; font-size: 11.5px; transition: transform 0.3s; }
.profile-btn:hover .profile-avatar { transform: rotateY(180deg); }
.profile-meta { text-align: left; line-height: 1.15; }
.profile-name { font-size: 12.5px; font-weight: 600; }
.profile-role { font-size: 10.5px; color: var(--text-faint); }
.profile-chevron { color: var(--text-faint); }

/* ---------- Content ---------- */
.content { padding: 26px 28px 60px; max-width: 1320px; }

/* Hero */
.hero-panel {
  position: relative; border-radius: 22px; overflow: hidden; padding: 34px 32px;
  background: linear-gradient(135deg, rgba(108,124,255,0.14), rgba(41,215,168,0.06));
  border: 1px solid var(--glass-border); margin-bottom: 22px; min-height: 150px;
}
.hero-content { position: relative; z-index: 2; max-width: 640px; }
.hero-eyebrow { font-size: 13px; color: var(--text-dim); font-weight: 600; margin-bottom: 8px; }
.wave { display: inline-block; animation: wave 2.2s ease-in-out infinite; transform-origin: 70% 70%; }
.hero-title { font-size: 26px; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 8px; line-height: 1.25; }
.hero-sub { font-size: 13.5px; color: var(--text-dim); margin: 0; max-width: 480px; }

.floating-bg { position: absolute; inset: 0; z-index: 1; overflow: hidden; }
.orb { position: absolute; border-radius: 50%; filter: blur(30px); opacity: 0.55; }
.orb-a { width: 160px; height: 160px; background: var(--indigo); top: -40px; right: 60px; animation: floatSlow 9s ease-in-out infinite; }
.orb-b { width: 100px; height: 100px; background: var(--green); bottom: -30px; right: 220px; animation: floatSlow 7s ease-in-out infinite reverse; }
.orb-c { width: 70px; height: 70px; background: var(--amber); top: 30px; right: 340px; animation: floatY 6s ease-in-out infinite; }
.ring { position: absolute; border: 1.5px solid rgba(255,255,255,0.14); border-radius: 50%; }
.ring-a { width: 220px; height: 220px; top: -80px; right: 10px; animation: spinSlow 40s linear infinite; }
.ring-b { width: 130px; height: 130px; bottom: -50px; right: 160px; animation: spinSlow 30s linear infinite reverse; }
.grid-plane {
  position: absolute; inset: -20% -10%; opacity: 0.12;
  background-image: linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px);
  background-size: 34px 34px;
  transform: perspective(400px) rotateX(55deg);
  mask-image: linear-gradient(to bottom, black, transparent 70%);
}

/* KPI cards */
.kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-bottom: 22px; }
.tilt-outer { animation: floatY 5s ease-in-out infinite; }
.tilt-inner { transition: transform 0.15s ease-out; transform-style: preserve-3d; height: 100%; }
.kpi-card {
  position: relative; border-radius: var(--radius); padding: 20px; overflow: hidden;
  background: linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015));
  border: 1px solid var(--glass-border);
  box-shadow: 0 14px 34px -14px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06);
  transition: box-shadow 0.25s;
}
.tilt-active .kpi-card { box-shadow: 0 24px 50px -16px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1); }
.kpi-glow { position: absolute; width: 140px; height: 140px; border-radius: 50%; filter: blur(50px); opacity: 0.35; top: -50px; right: -40px; }
.kpi-indigo .kpi-glow { background: var(--indigo); }
.kpi-green .kpi-glow { background: var(--green); }
.kpi-amber .kpi-glow { background: var(--amber); }
.kpi-top { display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 2; }
.kpi-icon { width: 38px; height: 38px; border-radius: 11px; display: flex; align-items: center; justify-content: center; }
.kpi-icon-indigo { background: var(--indigo-soft); color: var(--indigo); }
.kpi-icon-green { background: var(--green-soft); color: var(--green); }
.kpi-icon-amber { background: var(--amber-soft); color: var(--amber); }
.kpi-delta { display: flex; align-items: center; gap: 3px; font-size: 12px; font-weight: 700; padding: 3px 8px; border-radius: 20px; }
.delta-up { color: var(--green); background: var(--green-soft); }
.delta-down { color: var(--red); background: var(--red-soft); }
.kpi-label { font-size: 12.5px; color: var(--text-dim); margin-top: 16px; position: relative; z-index: 2; }
.kpi-value { font-size: 26px; font-weight: 800; margin-top: 4px; letter-spacing: -0.02em; position: relative; z-index: 2; }
.kpi-sparkline { display: flex; align-items: flex-end; gap: 3px; height: 38px; margin-top: 14px; position: relative; z-index: 2; }
.kpi-sparkline span { flex: 1; border-radius: 3px 3px 0 0; background: linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05)); animation: growUp 0.6s ease-out backwards; }
.kpi-indigo .kpi-sparkline span { background: linear-gradient(180deg, var(--indigo), transparent); }
.kpi-green .kpi-sparkline span { background: linear-gradient(180deg, var(--green), transparent); }
.kpi-amber .kpi-sparkline span { background: linear-gradient(180deg, var(--amber), transparent); }

/* Charts */
.charts-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 18px; margin-bottom: 22px; }
.chart-card-outer { animation: none; }
.panel {
  border-radius: var(--radius); padding: 20px 22px;
  background: linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.012));
  border: 1px solid var(--glass-border);
  box-shadow: 0 14px 34px -18px rgba(0,0,0,0.6);
}
.panel-head { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px; gap: 12px; flex-wrap: wrap; }
.panel-title { font-size: 15px; font-weight: 700; }
.panel-sub { font-size: 12px; color: var(--text-faint); margin-top: 2px; }
.chart-tooltip { background: rgba(13,18,32,0.95); border: 1px solid var(--glass-border); border-radius: 10px; padding: 10px 12px; font-size: 12px; backdrop-filter: blur(10px); }
.tooltip-month { color: var(--text-faint); margin-bottom: 4px; font-size: 11px; }
.tooltip-row { display: flex; align-items: center; gap: 6px; color: var(--text-dim); }
.tooltip-dot { width: 7px; height: 7px; border-radius: 50%; }
.legend-row { display: flex; justify-content: center; gap: 16px; margin-top: 6px; flex-wrap: wrap; }
.legend-item { font-size: 12px; color: var(--text-dim); display: flex; align-items: center; gap: 6px; }
.legend-dot { width: 8px; height: 8px; border-radius: 50%; }

/* Table */
.table-panel { padding: 20px 22px 8px; }
.table-scroll { overflow-x: auto; margin-top: 6px; }
.data-table { width: 100%; border-collapse: collapse; min-width: 640px; }
.data-table th {
  text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;
  color: var(--text-faint); font-weight: 600; padding: 10px 12px; border-bottom: 1px solid var(--glass-border);
}
.data-table td { padding: 13px 12px; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.04); }
.data-row { animation: fadeInUp 0.5s cubic-bezier(.4,0,.2,1) backwards; transition: transform 0.2s, background 0.2s; }
.data-row:hover { background: var(--glass); transform: translateY(-2px) scale(1.002); box-shadow: 0 10px 24px -14px rgba(0,0,0,0.6); }
.mono { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; }
.text-dim { color: var(--text-dim); }
.cell-person { display: flex; align-items: center; gap: 10px; font-weight: 500; }
.avatar { width: 30px; height: 30px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; animation: floatY 4.5s ease-in-out infinite; }
.avatar-indigo { background: var(--indigo-soft); color: var(--indigo); }
.avatar-green { background: var(--green-soft); color: var(--green); }
.avatar-amber { background: var(--amber-soft); color: var(--amber); }
.manager-tag { font-size: 11.5px; padding: 4px 9px; border-radius: 20px; background: var(--glass-strong); border: 1px solid var(--glass-border); color: var(--text-dim); box-shadow: 0 0 10px rgba(108,124,255,0.12); }
.row-action { width: 30px; height: 30px; border-radius: 8px; border: none; background: transparent; color: var(--text-faint); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.row-action:hover { background: var(--glass-strong); color: var(--text); }

.badge { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; font-weight: 600; padding: 4px 9px 4px 7px; border-radius: 20px; }
.badge-green { color: var(--green); background: var(--green-soft); box-shadow: 0 0 12px rgba(41,215,168,0.18); }
.badge-amber { color: var(--amber); background: var(--amber-soft); box-shadow: 0 0 12px rgba(246,169,77,0.18); animation: pulseGlowAmber 2.4s ease-in-out infinite; }
.badge-red { color: var(--red); background: var(--red-soft); }
.badge-muted { color: var(--text-faint); background: var(--glass-strong); }

/* Buttons */
.btn-3d {
  display: inline-flex; align-items: center; gap: 7px; font-size: 12.5px; font-weight: 600;
  padding: 10px 16px; border-radius: 11px; border: 1px solid var(--glass-border); cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s; color: var(--text);
}
.btn-3d:active { transform: translateY(2px) scale(0.98); }
.btn-ghost { background: var(--glass); }
.btn-ghost:hover { background: var(--glass-strong); }
.btn-primary { background: linear-gradient(135deg, var(--indigo), #8C6CFF); border: none; box-shadow: 0 8px 20px -6px rgba(108,124,255,0.55), inset 0 1px 0 rgba(255,255,255,0.25); }
.btn-primary:hover { box-shadow: 0 12px 26px -6px rgba(108,124,255,0.7), inset 0 1px 0 rgba(255,255,255,0.3); transform: translateY(-1px); }

/* List toolbar */
.list-toolbar { display: flex; gap: 10px; margin-bottom: 14px; flex-wrap: wrap; }
.search-field { flex: 1; min-width: 200px; display: flex; align-items: center; gap: 8px; padding: 9px 14px; border-radius: 11px; background: var(--glass); border: 1px solid var(--glass-border); color: var(--text-faint); transition: all 0.2s; }
.search-field:focus-within { border-color: var(--indigo); box-shadow: 0 0 0 3px var(--indigo-soft); }
.search-field input { background: transparent; border: none; outline: none; color: var(--text); font-size: 13px; width: 100%; }

/* Forms */
.form-panel { border-radius: var(--radius); padding: 26px 28px; background: linear-gradient(160deg, rgba(255,255,255,0.045), rgba(255,255,255,0.014)); border: 1px solid var(--glass-border); box-shadow: 0 14px 34px -18px rgba(0,0,0,0.6); }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; }
.form-field { display: flex; flex-direction: column; gap: 7px; }
.form-label { font-size: 12px; color: var(--text-dim); font-weight: 600; }
.form-input-wrap { display: flex; align-items: center; gap: 9px; padding: 11px 14px; border-radius: 11px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); transition: all 0.2s; }
.form-input-wrap:focus-within { border-color: var(--indigo); box-shadow: 0 0 0 3px var(--indigo-soft); background: rgba(108,124,255,0.05); }
.form-icon { color: var(--text-faint); flex-shrink: 0; }
.form-input { flex: 1; background: transparent; border: none; outline: none; color: var(--text); font-size: 13.5px; }
.form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--glass-border); }
.due-preview { display: flex; align-items: center; justify-content: space-between; margin-top: 18px; padding: 14px 16px; border-radius: 12px; background: var(--amber-soft); border: 1px solid rgba(246,169,77,0.25); font-size: 13px; color: var(--text-dim); }
.due-preview strong { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 17px; color: var(--text); }
.due-amount-warn { color: var(--amber) !important; }

/* Multi-step payment */
.step-indicator { display: flex; align-items: center; margin: 20px 0 6px; }
.step-dot { width: 30px; height: 30px; border-radius: 50%; background: var(--glass); border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 12.5px; font-weight: 700; color: var(--text-faint); position: relative; flex-shrink: 0; transition: all 0.3s; }
.step-current { background: var(--indigo); color: white; border-color: var(--indigo); box-shadow: 0 0 0 5px var(--indigo-soft); }
.step-done { background: var(--green); color: white; border-color: var(--green); }
.step-label { position: absolute; top: 38px; left: 50%; transform: translateX(-50%); font-size: 11px; color: var(--text-faint); white-space: nowrap; font-weight: 500; }
.step-line { flex: 1; height: 2px; background: var(--glass-border); margin: 0 6px; transition: background 0.4s; }
.step-line-done { background: var(--green); }
.step-body { margin-top: 44px; min-height: 140px; animation: fadeInUp 0.35s cubic-bezier(.4,0,.2,1); }

.method-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.method-card { border-radius: 14px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.03); cursor: pointer; padding: 20px 10px; perspective: 600px; transition: all 0.25s; }
.method-card:hover { transform: translateY(-3px); border-color: rgba(108,124,255,0.4); }
.method-card-selected { background: var(--indigo-soft); border-color: var(--indigo); box-shadow: 0 8px 22px -8px rgba(108,124,255,0.5); }
.method-flip { display: flex; flex-direction: column; align-items: center; gap: 9px; font-size: 12.5px; font-weight: 600; position: relative; animation: flipIn 0.4s cubic-bezier(.4,0,.2,1); }
.method-check { position: absolute; top: -14px; right: -8px; width: 18px; height: 18px; border-radius: 50%; background: var(--indigo); color: white; display: flex; align-items: center; justify-content: center; }
.review-card { display: flex; flex-direction: column; gap: 12px; padding: 18px 20px; border-radius: 14px; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); }
.review-row { display: flex; justify-content: space-between; font-size: 13px; color: var(--text-dim); }
.review-row strong { color: var(--text); font-family: 'Plus Jakarta Sans', sans-serif; }

/* Animations */
@keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes floatSlow { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-14px, 14px); } }
@keyframes spinSlow { from { transform: rotate(0); } to { transform: rotate(360deg); } }
@keyframes wave { 0%,100% { transform: rotate(0deg); } 20% { transform: rotate(18deg); } 40% { transform: rotate(-8deg); } 60% { transform: rotate(14deg); } }
@keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(241,99,122,0.55); } 70% { box-shadow: 0 0 0 8px rgba(241,99,122,0); } 100% { box-shadow: 0 0 0 0 rgba(241,99,122,0); } }
@keyframes pulseGlowAmber { 0%,100% { box-shadow: 0 0 8px rgba(246,169,77,0.15); } 50% { box-shadow: 0 0 16px rgba(246,169,77,0.4); } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes growUp { from { transform: scaleY(0); transform-origin: bottom; } to { transform: scaleY(1); transform-origin: bottom; } }
@keyframes slideDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes flipIn { from { transform: rotateY(90deg); opacity: 0; } to { transform: rotateY(0); opacity: 1; } }
.fade-in-up { animation: fadeInUp 0.4s cubic-bezier(.4,0,.2,1); }

/* Responsive */
@media (max-width: 1100px) {
  .charts-grid { grid-template-columns: 1fr; }
  .form-grid { grid-template-columns: 1fr; }
}
@media (max-width: 900px) {
  .kpi-grid { grid-template-columns: 1fr; }
  .sidebar { position: fixed; left: 0; top: 0; z-index: 50; transform: translateX(-100%); transition: transform 0.35s cubic-bezier(.4,0,.2,1); width: 260px; }
  .sidebar-mobile-open { transform: translateX(0); box-shadow: 20px 0 60px rgba(0,0,0,0.5); }
  .sidebar-collapsed { width: 260px; }
  .drawer-scrim { display: block; position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(3px); z-index: 40; }
  .content { padding: 20px 16px 50px; }
  .method-grid { grid-template-columns: repeat(2, 1fr); }
  .profile-meta { display: none; }
}
`;
