"use strict";
(self.webpackChunkNeslihanPortfolio =
  self.webpackChunkNeslihanPortfolio || []).push([
  [179],
  {
    602: () => {
      function ne(e) {
        return "function" == typeof e;
      }
      function $r(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Ko = $r(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function Vr(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class ot {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (ne(r))
              try {
                r();
              } catch (i) {
                t = i instanceof Ko ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  zl(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof Ko ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Ko(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) zl(t);
            else {
              if (t instanceof ot) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Vr(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && Vr(n, t), t instanceof ot && t._removeParent(this);
        }
      }
      ot.EMPTY = (() => {
        const e = new ot();
        return (e.closed = !0), e;
      })();
      const Bl = ot.EMPTY;
      function Hl(e) {
        return (
          e instanceof ot ||
          (e && "closed" in e && ne(e.remove) && ne(e.add) && ne(e.unsubscribe))
        );
      }
      function zl(e) {
        ne(e) ? e() : e.unsubscribe();
      }
      const wn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Xo = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Xo;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = Xo;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Gl(e) {
        Xo.setTimeout(() => {
          const { onUnhandledError: t } = wn;
          if (!t) throw e;
          t(e);
        });
      }
      function Wl() {}
      const g0 = Xs("C", void 0, void 0);
      function Xs(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Cn = null;
      function Jo(e) {
        if (wn.useDeprecatedSynchronousErrorHandling) {
          const t = !Cn;
          if ((t && (Cn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Cn;
            if (((Cn = null), n)) throw r;
          }
        } else e();
      }
      class Js extends ot {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Hl(t) && t.add(this))
              : (this.destination = _0);
        }
        static create(t, n, r) {
          return new Ur(t, n, r);
        }
        next(t) {
          this.isStopped
            ? ta(
                (function y0(e) {
                  return Xs("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? ta(
                (function m0(e) {
                  return Xs("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? ta(g0, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const D0 = Function.prototype.bind;
      function ea(e, t) {
        return D0.call(e, t);
      }
      class w0 {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              ei(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              ei(r);
            }
          else ei(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              ei(n);
            }
        }
      }
      class Ur extends Js {
        constructor(t, n, r) {
          let o;
          if ((super(), ne(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && wn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && ea(t.next, i),
                  error: t.error && ea(t.error, i),
                  complete: t.complete && ea(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new w0(o);
        }
      }
      function ei(e) {
        wn.useDeprecatedSynchronousErrorHandling
          ? (function v0(e) {
              wn.useDeprecatedSynchronousErrorHandling &&
                Cn &&
                ((Cn.errorThrown = !0), (Cn.error = e));
            })(e)
          : Gl(e);
      }
      function ta(e, t) {
        const { onStoppedNotification: n } = wn;
        n && Xo.setTimeout(() => n(e, t));
      }
      const _0 = {
          closed: !0,
          next: Wl,
          error: function C0(e) {
            throw e;
          },
          complete: Wl,
        },
        na =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function _n(e) {
        return e;
      }
      function ql(e) {
        return 0 === e.length
          ? _n
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let De = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function E0(e) {
              return (
                (e && e instanceof Js) ||
                ((function b0(e) {
                  return e && ne(e.next) && ne(e.error) && ne(e.complete);
                })(e) &&
                  Hl(e))
              );
            })(n)
              ? n
              : new Ur(n, r, o);
            return (
              Jo(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = Yl(r))((o, i) => {
              const s = new Ur({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [na]() {
            return this;
          }
          pipe(...n) {
            return ql(n)(this);
          }
          toPromise(n) {
            return new (n = Yl(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Yl(e) {
        var t;
        return null !== (t = e ?? wn.Promise) && void 0 !== t ? t : Promise;
      }
      const S0 = $r(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let $t = (() => {
        class e extends De {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Zl(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new S0();
          }
          next(n) {
            Jo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Jo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Jo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? Bl
              : ((this.currentObservers = null),
                i.push(n),
                new ot(() => {
                  (this.currentObservers = null), Vr(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new De();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Zl(t, n)), e;
      })();
      class Zl extends $t {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : Bl;
        }
      }
      function Ql(e) {
        return ne(e?.lift);
      }
      function be(e) {
        return (t) => {
          if (Ql(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Ee(e, t, n, r, o) {
        return new I0(e, t, n, r, o);
      }
      class I0 extends Js {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function G(e, t) {
        return be((n, r) => {
          let o = 0;
          n.subscribe(
            Ee(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function on(e) {
        return this instanceof on ? ((this.v = e), this) : new on(e);
      }
      function ed(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function sa(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (c) {
                    i({ value: c, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const td = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function nd(e) {
        return ne(e?.then);
      }
      function rd(e) {
        return ne(e[na]);
      }
      function od(e) {
        return Symbol.asyncIterator && ne(e?.[Symbol.asyncIterator]);
      }
      function id(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const sd = (function Z0() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function ad(e) {
        return ne(e?.[sd]);
      }
      function ud(e) {
        return (function Jl(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (p) {
                return new Promise(function (h, g) {
                  i.push([f, p, h, g]) > 1 || a(f, p);
                });
              });
          }
          function a(f, p) {
            try {
              !(function u(f) {
                f.value instanceof on
                  ? Promise.resolve(f.value.v).then(c, l)
                  : d(i[0][2], f);
              })(r[f](p));
            } catch (h) {
              d(i[0][3], h);
            }
          }
          function c(f) {
            a("next", f);
          }
          function l(f) {
            a("throw", f);
          }
          function d(f, p) {
            f(p), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield on(n.read());
              if (o) return yield on(void 0);
              yield yield on(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function cd(e) {
        return ne(e?.getReader);
      }
      function pt(e) {
        if (e instanceof De) return e;
        if (null != e) {
          if (rd(e))
            return (function Q0(e) {
              return new De((t) => {
                const n = e[na]();
                if (ne(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (td(e))
            return (function K0(e) {
              return new De((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (nd(e))
            return (function X0(e) {
              return new De((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, Gl);
              });
            })(e);
          if (od(e)) return ld(e);
          if (ad(e))
            return (function J0(e) {
              return new De((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (cd(e))
            return (function eD(e) {
              return ld(ud(e));
            })(e);
        }
        throw id(e);
      }
      function ld(e) {
        return new De((t) => {
          (function tD(e, t) {
            var n, r, o, i;
            return (function Kl(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(l) {
                  try {
                    c(r.next(l));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(l) {
                  try {
                    c(r.throw(l));
                  } catch (d) {
                    s(d);
                  }
                }
                function c(l) {
                  l.done
                    ? i(l.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(l.value).then(a, u);
                }
                c((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = ed(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Vt(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Se(e, t, n = 1 / 0) {
        return ne(t)
          ? Se((r, o) => G((i, s) => t(r, i, o, s))(pt(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            be((r, o) =>
              (function nD(e, t, n, r, o, i, s, a) {
                const u = [];
                let c = 0,
                  l = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !c && t.complete();
                  },
                  p = (g) => (c < r ? h(g) : u.push(g)),
                  h = (g) => {
                    i && t.next(g), c++;
                    let y = !1;
                    pt(n(g, l++)).subscribe(
                      Ee(
                        t,
                        (D) => {
                          o?.(D), i ? p(D) : t.next(D);
                        },
                        () => {
                          y = !0;
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (c--; u.length && c < r; ) {
                                const D = u.shift();
                                s ? Vt(t, s, () => h(D)) : h(D);
                              }
                              f();
                            } catch (D) {
                              t.error(D);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Ee(t, p, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function Bn(e = 1 / 0) {
        return Se(_n, e);
      }
      const Et = new De((e) => e.complete());
      function aa(e) {
        return e[e.length - 1];
      }
      function Br(e) {
        return (function oD(e) {
          return e && ne(e.schedule);
        })(aa(e))
          ? e.pop()
          : void 0;
      }
      function dd(e, t = 0) {
        return be((n, r) => {
          n.subscribe(
            Ee(
              r,
              (o) => Vt(r, e, () => r.next(o), t),
              () => Vt(r, e, () => r.complete(), t),
              (o) => Vt(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function fd(e, t = 0) {
        return be((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function pd(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new De((n) => {
          Vt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Vt(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function we(e, t) {
        return t
          ? (function fD(e, t) {
              if (null != e) {
                if (rd(e))
                  return (function aD(e, t) {
                    return pt(e).pipe(fd(t), dd(t));
                  })(e, t);
                if (td(e))
                  return (function cD(e, t) {
                    return new De((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (nd(e))
                  return (function uD(e, t) {
                    return pt(e).pipe(fd(t), dd(t));
                  })(e, t);
                if (od(e)) return pd(e, t);
                if (ad(e))
                  return (function lD(e, t) {
                    return new De((n) => {
                      let r;
                      return (
                        Vt(n, t, () => {
                          (r = e[sd]()),
                            Vt(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => ne(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (cd(e))
                  return (function dD(e, t) {
                    return pd(ud(e), t);
                  })(e, t);
              }
              throw id(e);
            })(e, t)
          : pt(e);
      }
      function ua(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new Ur({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return pt(t(...n)).subscribe(r);
      }
      function te(e) {
        for (let t in e) if (e[t] === te) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function re(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(re).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function la(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const gD = te({ __forward_ref__: te });
      function da(e) {
        return (
          (e.__forward_ref__ = da),
          (e.toString = function () {
            return re(this());
          }),
          e
        );
      }
      function T(e) {
        return fa(e) ? e() : e;
      }
      function fa(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(gD) &&
          e.__forward_ref__ === da
        );
      }
      function pa(e) {
        return e && !!e.ɵproviders;
      }
      const hd = "https://g.co/ng/security#xss";
      class w extends Error {
        constructor(t, n) {
          super(ti(t, n)), (this.code = t);
        }
      }
      function ti(e, t) {
        return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
      }
      function k(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function ni(e, t) {
        throw new w(-201, !1);
      }
      function it(e, t) {
        null == e &&
          (function X(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function F(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function an(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function ri(e) {
        return gd(e, oi) || gd(e, yd);
      }
      function gd(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function md(e) {
        return e && (e.hasOwnProperty(ha) || e.hasOwnProperty(xD))
          ? e[ha]
          : null;
      }
      const oi = te({ ɵprov: te }),
        ha = te({ ɵinj: te }),
        yd = te({ ngInjectableDef: te }),
        xD = te({ ngInjectorDef: te });
      var A = (() => (
        ((A = A || {})[(A.Default = 0)] = "Default"),
        (A[(A.Host = 1)] = "Host"),
        (A[(A.Self = 2)] = "Self"),
        (A[(A.SkipSelf = 4)] = "SkipSelf"),
        (A[(A.Optional = 8)] = "Optional"),
        A
      ))();
      let ga;
      function st(e) {
        const t = ga;
        return (ga = e), t;
      }
      function vd(e, t, n) {
        const r = ri(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & A.Optional
          ? null
          : void 0 !== t
          ? t
          : void ni(re(e));
      }
      const ie = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Hr = {},
        ma = "__NG_DI_FLAG__",
        ii = "ngTempTokenPath",
        ED = "ngTokenPath",
        SD = /\n/gm,
        ID = "\u0275",
        Dd = "__source";
      let zr;
      function Hn(e) {
        const t = zr;
        return (zr = e), t;
      }
      function MD(e, t = A.Default) {
        if (void 0 === zr) throw new w(-203, !1);
        return null === zr
          ? vd(e, void 0, t)
          : zr.get(e, t & A.Optional ? null : void 0, t);
      }
      function R(e, t = A.Default) {
        return (
          (function bD() {
            return ga;
          })() || MD
        )(T(e), t);
      }
      function W(e, t = A.Default) {
        return R(e, si(t));
      }
      function si(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function ya(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = T(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new w(900, !1);
            let o,
              i = A.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = TD(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(R(o, i));
          } else t.push(R(r));
        }
        return t;
      }
      function Gr(e, t) {
        return (e[ma] = t), (e.prototype[ma] = t), e;
      }
      function TD(e) {
        return e[ma];
      }
      function Ut(e) {
        return { toString: e }.toString();
      }
      var St = (() => (
          ((St = St || {})[(St.OnPush = 0)] = "OnPush"),
          (St[(St.Default = 1)] = "Default"),
          St
        ))(),
        It = (() => {
          return (
            ((e = It || (It = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            It
          );
          var e;
        })();
      const Bt = {},
        Z = [],
        ai = te({ ɵcmp: te }),
        va = te({ ɵdir: te }),
        Da = te({ ɵpipe: te }),
        Cd = te({ ɵmod: te }),
        Ht = te({ ɵfac: te }),
        Wr = te({ __NG_ELEMENT_ID__: te });
      let PD = 0;
      function Mt(e) {
        return Ut(() => {
          const t = xd(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === St.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              data: e.data || {},
              encapsulation: e.encapsulation || It.Emulated,
              id: "c" + PD++,
              styles: e.styles || Z,
              _: null,
              schemas: e.schemas || null,
              tView: null,
            };
          bd(n);
          const r = e.dependencies;
          return (n.directiveDefs = ui(r, !1)), (n.pipeDefs = ui(r, !0)), n;
        });
      }
      function ND(e) {
        return J(e) || Ae(e);
      }
      function FD(e) {
        return null !== e;
      }
      function xn(e) {
        return Ut(() => ({
          type: e.type,
          bootstrap: e.bootstrap || Z,
          declarations: e.declarations || Z,
          imports: e.imports || Z,
          exports: e.exports || Z,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function _d(e, t) {
        if (null == e) return Bt;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function ke(e) {
        return Ut(() => {
          const t = xd(e);
          return bd(t), t;
        });
      }
      function J(e) {
        return e[ai] || null;
      }
      function Ae(e) {
        return e[va] || null;
      }
      function ze(e) {
        return e[Da] || null;
      }
      function Ke(e, t) {
        const n = e[Cd] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${re(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function xd(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          selectors: e.selectors || Z,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: _d(e.inputs, t),
          outputs: _d(e.outputs),
        };
      }
      function bd(e) {
        e.features?.forEach((t) => t(e));
      }
      function ui(e, t) {
        if (!e) return null;
        const n = t ? ze : ND;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(FD);
      }
      const zt = 0,
        x = 1,
        V = 2,
        ce = 3,
        ht = 4,
        bn = 5,
        Re = 6,
        Gn = 7,
        de = 8,
        ci = 9,
        li = 10,
        B = 11,
        wa = 12,
        qr = 13,
        Ed = 14,
        Wn = 15,
        Pe = 16,
        Yr = 17,
        qn = 18,
        Tt = 19,
        Zr = 20,
        Sd = 21,
        se = 22,
        Ca = 1,
        Id = 2,
        di = 7,
        fi = 8,
        Yn = 9,
        Le = 10;
      function Xe(e) {
        return Array.isArray(e) && "object" == typeof e[Ca];
      }
      function gt(e) {
        return Array.isArray(e) && !0 === e[Ca];
      }
      function _a(e) {
        return 0 != (4 & e.flags);
      }
      function Qr(e) {
        return e.componentOffset > -1;
      }
      function pi(e) {
        return 1 == (1 & e.flags);
      }
      function mt(e) {
        return !!e.template;
      }
      function LD(e) {
        return 0 != (256 & e[V]);
      }
      function En(e, t) {
        return e.hasOwnProperty(Ht) ? e[Ht] : null;
      }
      class VD {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Sn() {
        return Ad;
      }
      function Ad(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = BD), UD;
      }
      function UD() {
        const e = Pd(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === Bt) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function BD(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            Pd(e) ||
            (function HD(e, t) {
              return (e[Rd] = t);
            })(e, { previous: Bt, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o];
        (s[o] = new VD(u && u.currentValue, t, a === Bt)), (e[r] = t);
      }
      Sn.ngInherit = !0;
      const Rd = "__ngSimpleChanges__";
      function Pd(e) {
        return e[Rd] || null;
      }
      const at = function (e, t, n) {};
      function Ie(e) {
        for (; Array.isArray(e); ) e = e[zt];
        return e;
      }
      function Je(e, t) {
        return Ie(t[e.index]);
      }
      function Fd(e, t) {
        return e.data[t];
      }
      function Ge(e, t) {
        const n = t[e];
        return Xe(n) ? n : n[zt];
      }
      function gi(e) {
        return 64 == (64 & e[V]);
      }
      function un(e, t) {
        return null == t ? null : e[t];
      }
      function kd(e) {
        e[qn] = 0;
      }
      function ba(e, t) {
        e[bn] += t;
        let n = e,
          r = e[ce];
        for (
          ;
          null !== r && ((1 === t && 1 === n[bn]) || (-1 === t && 0 === n[bn]));

        )
          (r[bn] += t), (n = r), (r = r[ce]);
      }
      const L = { lFrame: Wd(null), bindingsEnabled: !0 };
      function jd() {
        return L.bindingsEnabled;
      }
      function v() {
        return L.lFrame.lView;
      }
      function q() {
        return L.lFrame.tView;
      }
      function Me() {
        let e = $d();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function $d() {
        return L.lFrame.currentTNode;
      }
      function At(e, t) {
        const n = L.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Ea() {
        return L.lFrame.isParent;
      }
      function ow(e, t) {
        const n = L.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Ia(t);
      }
      function Ia(e) {
        L.lFrame.currentDirectiveIndex = e;
      }
      function Ta(e) {
        L.lFrame.currentQueryIndex = e;
      }
      function sw(e) {
        const t = e[x];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[Re] : null;
      }
      function zd(e, t, n) {
        if (n & A.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & A.Host ||
              ((o = sw(i)), null === o || ((i = i[Wn]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (L.lFrame = Gd());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Aa(e) {
        const t = Gd(),
          n = e[x];
        (L.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Gd() {
        const e = L.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Wd(e) : t;
      }
      function Wd(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function qd() {
        const e = L.lFrame;
        return (
          (L.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Yd = qd;
      function Ra() {
        const e = qd();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function In(e) {
        L.lFrame.selectedIndex = e;
      }
      function mi(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: c,
              ngOnDestroy: l,
            } = i;
          s && (e.contentHooks ?? (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks ?? (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks ?? (e.contentCheckHooks = [])).push(n, a)),
            u && (e.viewHooks ?? (e.viewHooks = [])).push(-n, u),
            c &&
              ((e.viewHooks ?? (e.viewHooks = [])).push(n, c),
              (e.viewCheckHooks ?? (e.viewCheckHooks = [])).push(n, c)),
            null != l && (e.destroyHooks ?? (e.destroyHooks = [])).push(n, l);
        }
      }
      function yi(e, t, n) {
        Zd(e, t, 3, n);
      }
      function vi(e, t, n, r) {
        (3 & e[V]) === n && Zd(e, t, n, r);
      }
      function Pa(e, t) {
        let n = e[V];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[V] = n));
      }
      function Zd(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[qn] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[qn] += 65536),
              (a < i || -1 == i) &&
                (gw(e, n, t, u), (e[qn] = (4294901760 & e[qn]) + u + 2)),
              u++;
      }
      function gw(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[V] >> 11 < e[qn] >> 16 && (3 & e[V]) === t) {
            (e[V] += 2048), at(4, a, i);
            try {
              i.call(a);
            } finally {
              at(5, a, i);
            }
          }
        } else {
          at(4, a, i);
          try {
            i.call(a);
          } finally {
            at(5, a, i);
          }
        }
      }
      const Kn = -1;
      class Xr {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Na(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            Kd(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function Qd(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function Kd(e) {
        return 64 === e.charCodeAt(0);
      }
      function Jr(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  Xd(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Xd(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function Jd(e) {
        return e !== Kn;
      }
      function Di(e) {
        return 32767 & e;
      }
      function wi(e, t) {
        let n = (function Dw(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[Wn]), n--;
        return r;
      }
      let Fa = !0;
      function Ci(e) {
        const t = Fa;
        return (Fa = e), t;
      }
      const ef = 255,
        tf = 5;
      let ww = 0;
      const Rt = {};
      function _i(e, t) {
        const n = nf(e, t);
        if (-1 !== n) return n;
        const r = t[x];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          ka(r.data, e),
          ka(t, null),
          ka(r.blueprint, null));
        const o = La(e, t),
          i = e.injectorIndex;
        if (Jd(o)) {
          const s = Di(o),
            a = wi(o, t),
            u = a[x].data;
          for (let c = 0; c < 8; c++) t[i + c] = a[s + c] | u[s + c];
        }
        return (t[i + 8] = o), i;
      }
      function ka(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function nf(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function La(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = ff(o)), null === r)) return Kn;
          if ((n++, (o = o[Wn]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return Kn;
      }
      function ja(e, t, n) {
        !(function Cw(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Wr) && (r = n[Wr]),
            null == r && (r = n[Wr] = ww++);
          const o = r & ef;
          t.data[e + (o >> tf)] |= 1 << o;
        })(e, t, n);
      }
      function rf(e, t, n) {
        if (n & A.Optional || void 0 !== e) return e;
        ni();
      }
      function sf(e, t, n, r) {
        if (
          (n & A.Optional && void 0 === r && (r = null),
          !(n & (A.Self | A.Host)))
        ) {
          const o = e[ci],
            i = st(void 0);
          try {
            return o ? o.get(t, r, n & A.Optional) : vd(t, r, n & A.Optional);
          } finally {
            st(i);
          }
        }
        return rf(r, 0, n);
      }
      function af(e, t, n, r = A.Default, o) {
        if (null !== e) {
          if (1024 & t[V]) {
            const s = (function Sw(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 1024 & s[V] && !(256 & s[V]);

              ) {
                const a = uf(i, s, n, r | A.Self, Rt);
                if (a !== Rt) return a;
                let u = i.parent;
                if (!u) {
                  const c = s[Sd];
                  if (c) {
                    const l = c.get(n, Rt, r);
                    if (l !== Rt) return l;
                  }
                  (u = ff(s)), (s = s[Wn]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, Rt);
            if (s !== Rt) return s;
          }
          const i = uf(e, t, n, r, Rt);
          if (i !== Rt) return i;
        }
        return sf(t, n, r, o);
      }
      function uf(e, t, n, r, o) {
        const i = (function bw(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(Wr) ? e[Wr] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & ef : Ew) : t;
        })(n);
        if ("function" == typeof i) {
          if (!zd(t, e, r)) return r & A.Host ? rf(o, 0, r) : sf(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & A.Optional) return s;
            ni();
          } finally {
            Yd();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = nf(e, t),
            u = Kn,
            c = r & A.Host ? t[Pe][Re] : null;
          for (
            (-1 === a || r & A.SkipSelf) &&
            ((u = -1 === a ? La(e, t) : t[a + 8]),
            u !== Kn && lf(r, !1)
              ? ((s = t[x]), (a = Di(u)), (t = wi(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const l = t[x];
            if (cf(i, a, l.data)) {
              const d = xw(a, t, n, s, r, c);
              if (d !== Rt) return d;
            }
            (u = t[a + 8]),
              u !== Kn && lf(r, t[x].data[a + 8] === c) && cf(i, a, t)
                ? ((s = l), (a = Di(u)), (t = wi(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function xw(e, t, n, r, o, i) {
        const s = t[x],
          a = s.data[e + 8],
          l = (function xi(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              l = i >> 20,
              f = o ? a + l : e.directiveEnd;
            for (let p = r ? a : a + l; p < f; p++) {
              const h = s[p];
              if ((p < u && n === h) || (p >= u && h.type === n)) return p;
            }
            if (o) {
              const p = s[u];
              if (p && mt(p) && p.type === n) return u;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? Qr(a) && Fa : r != s && 0 != (3 & a.type),
            o & A.Host && i === a
          );
        return null !== l ? Mn(t, s, l, a) : Rt;
      }
      function Mn(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function mw(e) {
            return e instanceof Xr;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function mD(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new w(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function K(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : k(e);
              })(i[n])
            );
          const a = Ci(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? st(s.injectImpl) : null;
          zd(e, r, A.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function hw(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = Ad(t);
                    (n.preOrderHooks ?? (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks ?? (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ?? (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== u && st(u), Ci(a), (s.resolving = !1), Yd();
          }
        }
        return o;
      }
      function cf(e, t, n) {
        return !!(n[t + (e >> tf)] & (1 << e));
      }
      function lf(e, t) {
        return !(e & A.Self || (e & A.Host && t));
      }
      class Xn {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return af(this._tNode, this._lView, t, si(r), n);
        }
      }
      function Ew() {
        return new Xn(Me(), v());
      }
      function $a(e) {
        return fa(e)
          ? () => {
              const t = $a(T(e));
              return t && t();
            }
          : En(e);
      }
      function ff(e) {
        const t = e[x],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[Re] : null;
      }
      const er = "__parameters__";
      function nr(e, t, n) {
        return Ut(() => {
          const r = (function Va(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, c, l) {
              const d = u.hasOwnProperty(er)
                ? u[er]
                : Object.defineProperty(u, er, { value: [] })[er];
              for (; d.length <= l; ) d.push(null);
              return (d[l] = d[l] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class P {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = F({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Tn(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Tn(n, t) : t(n)));
      }
      function hf(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Ei(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const ro = Gr(nr("Optional"), 8),
        oo = Gr(nr("SkipSelf"), 4);
      var We = (() => (
        ((We = We || {})[(We.Important = 1)] = "Important"),
        (We[(We.DashCase = 2)] = "DashCase"),
        We
      ))();
      const Ya = new Map();
      let Xw = 0;
      const Qa = "__ngContext__";
      function Oe(e, t) {
        Xe(t)
          ? ((e[Qa] = t[Zr]),
            (function eC(e) {
              Ya.set(e[Zr], e);
            })(t))
          : (e[Qa] = t);
      }
      let Ka;
      function Xa(e, t) {
        return Ka(e, t);
      }
      function uo(e) {
        const t = e[ce];
        return gt(t) ? t[ce] : t;
      }
      function Ja(e) {
        return Ff(e[qr]);
      }
      function eu(e) {
        return Ff(e[ht]);
      }
      function Ff(e) {
        for (; null !== e && !gt(e); ) e = e[ht];
        return e;
      }
      function ir(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          gt(r) ? (i = r) : Xe(r) && ((s = !0), (r = r[zt]));
          const a = Ie(r);
          0 === e && null !== n
            ? null == o
              ? Uf(t, n, a)
              : An(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? An(t, n, a, o || null, !0)
            : 2 === e
            ? (function au(e, t, n) {
                const r = Ti(e, t);
                r &&
                  (function wC(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function xC(e, t, n, r, o) {
                const i = n[di];
                i !== Ie(n) && ir(t, e, r, i, o);
                for (let a = Le; a < n.length; a++) {
                  const u = n[a];
                  co(u[x], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function nu(e, t, n) {
        return e.createElement(t, n);
      }
      function Lf(e, t) {
        const n = e[Yn],
          r = n.indexOf(t),
          o = t[ce];
        512 & t[V] && ((t[V] &= -513), ba(o, -1)), n.splice(r, 1);
      }
      function ru(e, t) {
        if (e.length <= Le) return;
        const n = Le + t,
          r = e[n];
        if (r) {
          const o = r[Yr];
          null !== o && o !== e && Lf(o, r), t > 0 && (e[n - 1][ht] = r[ht]);
          const i = Ei(e, Le + t);
          !(function fC(e, t) {
            co(e, t, t[B], 2, null, null), (t[zt] = null), (t[Re] = null);
          })(r[x], r);
          const s = i[Tt];
          null !== s && s.detachView(i[x]),
            (r[ce] = null),
            (r[ht] = null),
            (r[V] &= -65);
        }
        return r;
      }
      function jf(e, t) {
        if (!(128 & t[V])) {
          const n = t[B];
          n.destroyNode && co(e, t, n, 3, null, null),
            (function gC(e) {
              let t = e[qr];
              if (!t) return ou(e[x], e);
              for (; t; ) {
                let n = null;
                if (Xe(t)) n = t[qr];
                else {
                  const r = t[Le];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[ht] && t !== e; )
                    Xe(t) && ou(t[x], t), (t = t[ce]);
                  null === t && (t = e), Xe(t) && ou(t[x], t), (n = t && t[ht]);
                }
                t = n;
              }
            })(t);
        }
      }
      function ou(e, t) {
        if (!(128 & t[V])) {
          (t[V] &= -65),
            (t[V] |= 128),
            (function DC(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof Xr)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        at(4, a, u);
                        try {
                          u.call(a);
                        } finally {
                          at(5, a, u);
                        }
                      }
                    else {
                      at(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        at(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function vC(e, t) {
              const n = e.cleanup,
                r = t[Gn];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[(o = s)]() : r[(o = -s)].unsubscribe(), (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                t[Gn] = null;
              }
            })(e, t),
            1 === t[x].type && t[B].destroy();
          const n = t[Yr];
          if (null !== n && gt(t[ce])) {
            n !== t[ce] && Lf(n, t);
            const r = t[Tt];
            null !== r && r.detachView(e);
          }
          !(function tC(e) {
            Ya.delete(e[Zr]);
          })(t);
        }
      }
      function $f(e, t, n) {
        return (function Vf(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[zt];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === It.None || i === It.Emulated) return null;
            }
            return Je(r, n);
          }
        })(e, t.parent, n);
      }
      function An(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function Uf(e, t, n) {
        e.appendChild(t, n);
      }
      function Bf(e, t, n, r, o) {
        null !== r ? An(e, t, n, r, o) : Uf(e, t, n);
      }
      function Ti(e, t) {
        return e.parentNode(t);
      }
      let iu,
        Pi,
        lu,
        Oi,
        Gf = function zf(e, t, n) {
          return 40 & e.type ? Je(e, n) : null;
        };
      function Ai(e, t, n, r) {
        const o = $f(e, r, t),
          i = t[B],
          a = (function Hf(e, t, n) {
            return Gf(e, t, n);
          })(r.parent || t[Re], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) Bf(i, o, n[u], a, !1);
          else Bf(i, o, n, a, !1);
        void 0 !== iu && iu(i, r, t, n, o);
      }
      function Ri(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return Je(t, e);
          if (4 & n) return su(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Ri(e, r);
            {
              const o = e[t.index];
              return gt(o) ? su(-1, o) : Ie(o);
            }
          }
          if (32 & n) return Xa(t, e)() || Ie(e[t.index]);
          {
            const r = qf(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Ri(uo(e[Pe]), r)
              : Ri(e, t.next);
          }
        }
        return null;
      }
      function qf(e, t) {
        return null !== t ? e[Pe][Re].projection[t.projection] : null;
      }
      function su(e, t) {
        const n = Le + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[x].firstChild;
          if (null !== o) return Ri(r, o);
        }
        return t[di];
      }
      function uu(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && Oe(Ie(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & u) uu(e, t, n.child, r, o, i, !1), ir(t, e, o, a, i);
            else if (32 & u) {
              const c = Xa(n, r);
              let l;
              for (; (l = c()); ) ir(t, e, o, l, i);
              ir(t, e, o, a, i);
            } else 16 & u ? Yf(e, t, r, n, o, i) : ir(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function co(e, t, n, r, o, i) {
        uu(n, r, e.firstChild, t, o, i, !1);
      }
      function Yf(e, t, n, r, o, i) {
        const s = n[Pe],
          u = s[Re].projection[r.projection];
        if (Array.isArray(u))
          for (let c = 0; c < u.length; c++) ir(t, e, o, u[c], i);
        else uu(e, t, u, s[ce], o, i, !0);
      }
      function Zf(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function Qf(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && Na(e, t, r),
          null !== o && Zf(e, t, o),
          null !== i &&
            (function EC(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      function ep(e) {
        return (
          (function du() {
            if (void 0 === Oi && ((Oi = null), ie.trustedTypes))
              try {
                Oi = ie.trustedTypes.createPolicy("angular#unsafe-bypass", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return Oi;
          })()?.createScriptURL(e) || e
        );
      }
      class tp {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${hd})`;
        }
      }
      function cn(e) {
        return e instanceof tp ? e.changingThisBreaksApplicationSecurity : e;
      }
      function lo(e, t) {
        const n = (function FC(e) {
          return (e instanceof tp && e.getTypeName()) || null;
        })(e);
        if (null != n && n !== t) {
          if ("ResourceURL" === n && "URL" === t) return !0;
          throw new Error(`Required a safe ${t}, got a ${n} (see ${hd})`);
        }
        return n === t;
      }
      const $C = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      var me = (() => (
        ((me = me || {})[(me.NONE = 0)] = "NONE"),
        (me[(me.HTML = 1)] = "HTML"),
        (me[(me.STYLE = 2)] = "STYLE"),
        (me[(me.SCRIPT = 3)] = "SCRIPT"),
        (me[(me.URL = 4)] = "URL"),
        (me[(me.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        me
      ))();
      function up(e) {
        const t = po();
        return t
          ? t.sanitize(me.URL, e) || ""
          : lo(e, "URL")
          ? cn(e)
          : (function fu(e) {
              return (e = String(e)).match($C) ? e : "unsafe:" + e;
            })(k(e));
      }
      function cp(e) {
        const t = po();
        if (t) return ep(t.sanitize(me.RESOURCE_URL, e) || "");
        if (lo(e, "ResourceURL")) return ep(cn(e));
        throw new w(904, !1);
      }
      function lp(e) {
        return (function IC(e) {
          return (
            (function cu() {
              if (void 0 === Pi && ((Pi = null), ie.trustedTypes))
                try {
                  Pi = ie.trustedTypes.createPolicy("angular", {
                    createHTML: (e) => e,
                    createScript: (e) => e,
                    createScriptURL: (e) => e,
                  });
                } catch {}
              return Pi;
            })()?.createScriptURL(e) || e
          );
        })(e[0]);
      }
      function po() {
        const e = v();
        return e && e[wa];
      }
      const Fi = new P("ENVIRONMENT_INITIALIZER"),
        fp = new P("INJECTOR", -1),
        pp = new P("INJECTOR_DEF_TYPES");
      class hp {
        get(t, n = Hr) {
          if (n === Hr) {
            const r = new Error(`NullInjectorError: No provider for ${re(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function KC(...e) {
        return { ɵproviders: gp(0, e), ɵfromNgModule: !0 };
      }
      function gp(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          Tn(t, (i) => {
            const s = i;
            mu(s, n, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && mp(o, n),
          n
        );
      }
      function mp(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          yu(o, (i) => {
            t.push(i);
          });
        }
      }
      function mu(e, t, n, r) {
        if (!(e = T(e))) return !1;
        let o = null,
          i = md(e);
        const s = !i && J(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = md(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const c of u) mu(c, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let c;
              r.add(o);
              try {
                Tn(i.imports, (l) => {
                  mu(l, t, n, r) && (c || (c = []), c.push(l));
                });
              } finally {
              }
              void 0 !== c && mp(c, t);
            }
            if (!a) {
              const c = En(o) || (() => new o());
              t.push(
                { provide: o, useFactory: c, deps: Z },
                { provide: pp, useValue: o, multi: !0 },
                { provide: Fi, useValue: () => R(o), multi: !0 }
              );
            }
            const u = i.providers;
            null == u ||
              a ||
              yu(u, (l) => {
                t.push(l);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function yu(e, t) {
        for (let n of e)
          pa(n) && (n = n.ɵproviders), Array.isArray(n) ? yu(n, t) : t(n);
      }
      const XC = te({ provide: String, useValue: te });
      function vu(e) {
        return null !== e && "object" == typeof e && XC in e;
      }
      function Rn(e) {
        return "function" == typeof e;
      }
      const Du = new P("Set Injector scope."),
        ki = {},
        e_ = {};
      let wu;
      function Li() {
        return void 0 === wu && (wu = new hp()), wu;
      }
      class Yt {}
      class Dp extends Yt {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            _u(t, (s) => this.processProvider(s)),
            this.records.set(fp, ar(void 0, this)),
            o.has("environment") && this.records.set(Yt, ar(void 0, this));
          const i = this.records.get(Du);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(pp.multi, Z, A.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = Hn(this),
            r = st(void 0);
          try {
            return t();
          } finally {
            Hn(n), st(r);
          }
        }
        get(t, n = Hr, r = A.Default) {
          this.assertNotDestroyed(), (r = si(r));
          const o = Hn(this),
            i = st(void 0);
          try {
            if (!(r & A.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function i_(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof P)
                    );
                  })(t) && ri(t);
                (a = u && this.injectableDefInScope(u) ? ar(Cu(t), ki) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & A.Self ? Li() : this.parent).get(
              t,
              (n = r & A.Optional && n === Hr ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[ii] = s[ii] || []).unshift(re(t)), o)) throw s;
              return (function AD(e, t, n, r) {
                const o = e[ii];
                throw (
                  (t[Dd] && o.unshift(t[Dd]),
                  (e.message = (function RD(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && e.charAt(1) == ID
                        ? e.slice(2)
                        : e;
                    let o = re(t);
                    if (Array.isArray(t)) o = t.map(re).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : re(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      SD,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e[ED] = o),
                  (e[ii] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            st(i), Hn(o);
          }
        }
        resolveInjectorInitializers() {
          const t = Hn(this),
            n = st(void 0);
          try {
            const r = this.get(Fi.multi, Z, A.Self);
            for (const o of r) o();
          } finally {
            Hn(t), st(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(re(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new w(205, !1);
        }
        processProvider(t) {
          let n = Rn((t = T(t))) ? t : T(t && t.provide);
          const r = (function n_(e) {
            return vu(e)
              ? ar(void 0, e.useValue)
              : ar(
                  (function wp(e, t, n) {
                    let r;
                    if (Rn(e)) {
                      const o = T(e);
                      return En(o) || Cu(o);
                    }
                    if (vu(e)) r = () => T(e.useValue);
                    else if (
                      (function vp(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...ya(e.deps || []));
                    else if (
                      (function yp(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => R(T(e.useExisting));
                    else {
                      const o = T(e && (e.useClass || e.provide));
                      if (
                        !(function r_(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return En(o) || Cu(o);
                      r = () => new o(...ya(e.deps));
                    }
                    return r;
                  })(e),
                  ki
                );
          })(t);
          if (Rn(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = ar(void 0, ki, !0)),
              (o.factory = () => ya(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === ki && ((n.value = e_), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function o_(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = T(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function Cu(e) {
        const t = ri(e),
          n = null !== t ? t.factory : En(e);
        if (null !== n) return n;
        if (e instanceof P) throw new w(204, !1);
        if (e instanceof Function)
          return (function t_(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function no(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new w(204, !1))
              );
            const n = (function _D(e) {
              return (e && (e[oi] || e[yd])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new w(204, !1);
      }
      function ar(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function _u(e, t) {
        for (const n of e)
          Array.isArray(n) ? _u(n, t) : n && pa(n) ? _u(n.ɵproviders, t) : t(n);
      }
      class s_ {}
      class Cp {}
      class u_ {
        resolveComponentFactory(t) {
          throw (function a_(e) {
            const t = Error(
              `No component factory found for ${re(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let ho = (() => {
        class e {}
        return (e.NULL = new u_()), e;
      })();
      function c_() {
        return ur(Me(), v());
      }
      function ur(e, t) {
        return new ln(Je(e, t));
      }
      let ln = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = c_), e;
      })();
      class xp {}
      let ji = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function d_() {
                const e = v(),
                  n = Ge(Me().index, e);
                return (Xe(n) ? n : e)[B];
              })()),
            e
          );
        })(),
        f_ = (() => {
          class e {}
          return (
            (e.ɵprov = F({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class $i {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const p_ = new $i("15.2.9"),
        xu = {},
        bu = "ngOriginalError";
      function Eu(e) {
        return e[bu];
      }
      class cr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Eu(t);
          for (; n && Eu(n); ) n = Eu(n);
          return n || null;
        }
      }
      function Zt(e) {
        return e instanceof Function ? e() : e;
      }
      function Ep(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const Sp = "ng-template";
      function b_(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (n && "class" === i && -1 !== Ep(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function Ip(e) {
        return 4 === e.type && e.value !== Sp;
      }
      function E_(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Sp);
      }
      function S_(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function T_(e) {
            for (let t = 0; t < e.length; t++) if (Qd(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !E_(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (yt(r)) return !1;
                  s = !0;
                }
              } else {
                const c = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!b_(e.attrs, c, n)) {
                    if (yt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = I_(8 & r ? "class" : u, o, Ip(e), n);
                if (-1 === d) {
                  if (yt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== c) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const p = 8 & r ? f : null;
                  if ((p && -1 !== Ep(p, c, 0)) || (2 & r && c !== f)) {
                    if (yt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !yt(r) && !yt(u)) return !1;
            if (s && yt(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return yt(r) || s;
      }
      function yt(e) {
        return 0 == (1 & e);
      }
      function I_(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function A_(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Mp(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (S_(e, t[r], n)) return !0;
        return !1;
      }
      function Tp(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function P_(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !yt(s) && ((t += Tp(i, o)), (o = "")),
              (r = s),
              (i = i || !yt(r));
          n++;
        }
        return "" !== o && (t += Tp(i, o)), t;
      }
      const j = {};
      function Np(e, t = null, n = null, r) {
        const o = Fp(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function Fp(e, t = null, n = null, r, o = new Set()) {
        const i = [n || Z, KC(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : re(e))),
          new Dp(i, t || Li(), r || null, o)
        );
      }
      let Qt = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return Np({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return Np({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Hr),
          (e.NULL = new hp()),
          (e.ɵprov = F({ token: e, providedIn: "any", factory: () => R(fp) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function O(e, t = A.Default) {
        const n = v();
        return null === n ? R(e, t) : af(Me(), n, T(e), t);
      }
      function Hp(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              Ta(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Ui(e, t, n, r, o, i, s, a, u, c, l) {
        const d = t.blueprint.slice();
        return (
          (d[zt] = o),
          (d[V] = 76 | r),
          (null !== l || (e && 1024 & e[V])) && (d[V] |= 1024),
          kd(d),
          (d[ce] = d[Wn] = e),
          (d[de] = n),
          (d[li] = s || (e && e[li])),
          (d[B] = a || (e && e[B])),
          (d[wa] = u || (e && e[wa]) || null),
          (d[ci] = c || (e && e[ci]) || null),
          (d[Re] = i),
          (d[Zr] = (function Jw() {
            return Xw++;
          })()),
          (d[Sd] = l),
          (d[Pe] = 2 == t.type ? e[Pe] : d),
          d
        );
      }
      function fr(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Au(e, t, n, r, o) {
            const i = $d(),
              s = Ea(),
              u = (e.data[t] = (function i1(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  componentOffset: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tView: null,
                  next: null,
                  prev: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            );
          })(e, t, n, r, o)),
            (function rw() {
              return L.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function Kr() {
            const e = L.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return At(i, !0), i;
      }
      function go(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Ru(e, t, n) {
        Aa(t);
        try {
          const r = e.viewQuery;
          null !== r && Vu(1, r, n);
          const o = e.template;
          null !== o && zp(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Hp(e, t),
            e.staticViewQueries && Vu(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function n1(e, t) {
              for (let n = 0; n < t.length; n++) E1(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[V] &= -5), Ra();
        }
      }
      function Bi(e, t, n, r) {
        const o = t[V];
        if (128 != (128 & o)) {
          Aa(t);
          try {
            kd(t),
              (function Ud(e) {
                return (L.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && zp(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const c = e.preOrderCheckHooks;
              null !== c && yi(t, c, null);
            } else {
              const c = e.preOrderHooks;
              null !== c && vi(t, c, 0, null), Pa(t, 0);
            }
            if (
              ((function x1(e) {
                for (let t = Ja(e); null !== t; t = eu(t)) {
                  if (!t[Id]) continue;
                  const n = t[Yn];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    512 & o[V] || ba(o[ce], 1), (o[V] |= 512);
                  }
                }
              })(t),
              (function _1(e) {
                for (let t = Ja(e); null !== t; t = eu(t))
                  for (let n = Le; n < t.length; n++) {
                    const r = t[n],
                      o = r[x];
                    gi(r) && Bi(o, r, o.template, r[de]);
                  }
              })(t),
              null !== e.contentQueries && Hp(e, t),
              s)
            ) {
              const c = e.contentCheckHooks;
              null !== c && yi(t, c);
            } else {
              const c = e.contentHooks;
              null !== c && vi(t, c, 1), Pa(t, 1);
            }
            !(function e1(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) In(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r];
                      ow(s, i), a(2, t[i]);
                    }
                  }
                } finally {
                  In(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function t1(e, t) {
                for (let n = 0; n < t.length; n++) b1(e, t[n]);
              })(t, a);
            const u = e.viewQuery;
            if ((null !== u && Vu(2, u, r), s)) {
              const c = e.viewCheckHooks;
              null !== c && yi(t, c);
            } else {
              const c = e.viewHooks;
              null !== c && vi(t, c, 2), Pa(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[V] &= -41),
              512 & t[V] && ((t[V] &= -513), ba(t[ce], -1));
          } finally {
            Ra();
          }
        }
      }
      function zp(e, t, n, r, o) {
        const i = (function $e() {
            return L.lFrame.selectedIndex;
          })(),
          s = 2 & r;
        try {
          In(-1),
            s &&
              t.length > se &&
              (function Ap(e, t, n, r) {
                if (!r)
                  if (3 == (3 & t[V])) {
                    const i = e.preOrderCheckHooks;
                    null !== i && yi(t, i, n);
                  } else {
                    const i = e.preOrderHooks;
                    null !== i && vi(t, i, 0, n);
                  }
                In(n);
              })(e, t, se, !1),
            at(s ? 2 : 0, o),
            n(r, o);
        } finally {
          In(i), at(s ? 3 : 1, o);
        }
      }
      function Pu(e, t, n) {
        if (_a(t)) {
          const o = t.directiveEnd;
          for (let i = t.directiveStart; i < o; i++) {
            const s = e.data[i];
            s.contentQueries && s.contentQueries(1, n[i], i);
          }
        }
      }
      function Gp(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Fu(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function Fu(e, t, n, r, o, i, s, a, u, c) {
        const l = se + r,
          d = l + o,
          f = (function r1(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : j);
            return n;
          })(l, d),
          p = "function" == typeof c ? c() : c;
        return (f[x] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, l),
          bindingStartIndex: l,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: p,
          incompleteFirstPass: !1,
        });
      }
      function qp(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? Yp(n, t, o, i)
              : r.hasOwnProperty(o) && Yp(n, t, r[o], i);
          }
        return n;
      }
      function Yp(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function Zp(e, t, n, r, o, i) {
        for (let c = 0; c < r.length; c++) ja(_i(n, t), e, r[c].type);
        !(function y1(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let c = 0; c < r.length; c++) {
          const l = r[c];
          l.providersResolver && l.providersResolver(l);
        }
        let s = !1,
          a = !1,
          u = go(e, t, r.length, null);
        for (let c = 0; c < r.length; c++) {
          const l = r[c];
          (n.mergedAttrs = Jr(n.mergedAttrs, l.hostAttrs)),
            v1(e, n, t, u, l),
            m1(u, l, o),
            null !== l.contentQueries && (n.flags |= 4),
            (null !== l.hostBindings ||
              null !== l.hostAttrs ||
              0 !== l.hostVars) &&
              (n.flags |= 64);
          const d = l.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ?? (e.preOrderHooks = [])).push(n.index),
            (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ?? (e.preOrderCheckHooks = [])).push(
                n.index
              ),
              (a = !0)),
            u++;
        }
        !(function s1(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let u = null,
            c = null;
          for (let l = t.directiveStart; l < o; l++) {
            const d = i[l],
              f = n ? n.get(d) : null,
              h = f ? f.outputs : null;
            (u = qp(d.inputs, l, u, f ? f.inputs : null)),
              (c = qp(d.outputs, l, c, h));
            const g = null === u || null === s || Ip(t) ? null : C1(u, l, s);
            a.push(g);
          }
          null !== u &&
            (u.hasOwnProperty("class") && (t.flags |= 8),
            u.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = u),
            (t.outputs = c);
        })(e, n, i);
      }
      function Qp(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function iw() {
            return L.lFrame.currentDirectiveIndex;
          })();
        try {
          In(i);
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              c = t[a];
            Ia(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                p1(u, c);
          }
        } finally {
          In(-1), Ia(s);
        }
      }
      function p1(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Lu(e, t, n) {
        (t.componentOffset = n),
          (e.components ?? (e.components = [])).push(t.index);
      }
      function m1(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          mt(t) && (n[""] = e);
        }
      }
      function v1(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = En(o.type)),
          s = new Xr(i, mt(o), O);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function l1(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function d1(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, go(e, n, o.hostVars, j), o);
      }
      function Pt(e, t, n, r, o, i) {
        const s = Je(e, t);
        !(function ju(e, t, n, r, o, i, s) {
          if (null == i) e.removeAttribute(t, o, n);
          else {
            const a = null == s ? k(i) : s(i, r || "", o);
            e.setAttribute(t, o, a, n);
          }
        })(t[B], s, i, e.value, n, r, o);
      }
      function w1(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let u = 0; u < s.length; ) {
            const c = s[u++],
              l = s[u++],
              d = s[u++];
            null !== a ? r.setInput(n, d, c, l) : (n[l] = d);
          }
        }
      }
      function C1(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function b1(e, t) {
        const n = Ge(t, e);
        if (gi(n)) {
          const r = n[x];
          48 & n[V] ? Bi(r, n, r.template, n[de]) : n[bn] > 0 && $u(n);
        }
      }
      function $u(e) {
        for (let r = Ja(e); null !== r; r = eu(r))
          for (let o = Le; o < r.length; o++) {
            const i = r[o];
            if (gi(i))
              if (512 & i[V]) {
                const s = i[x];
                Bi(s, i, s.template, i[de]);
              } else i[bn] > 0 && $u(i);
          }
        const n = e[x].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = Ge(n[r], e);
            gi(o) && o[bn] > 0 && $u(o);
          }
      }
      function E1(e, t) {
        const n = Ge(t, e),
          r = n[x];
        (function S1(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          Ru(r, n, n[de]);
      }
      function Hi(e, t) {
        return e[qr] ? (e[Ed][ht] = t) : (e[qr] = t), (e[Ed] = t), t;
      }
      function zi(e) {
        for (; e; ) {
          e[V] |= 32;
          const t = uo(e);
          if (LD(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Gi(e, t, n, r = !0) {
        const o = t[li];
        o.begin && o.begin();
        try {
          Bi(e, t, e.template, n);
        } catch (s) {
          throw (r && th(t, s), s);
        } finally {
          o.end && o.end();
        }
      }
      function Vu(e, t, n) {
        Ta(0), t(e, n);
      }
      function Xp(e) {
        return e[Gn] || (e[Gn] = []);
      }
      function Jp(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function th(e, t) {
        const n = e[ci],
          r = n ? n.get(cr, null) : null;
        r && r.handleError(t);
      }
      function Uu(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            u = t[s],
            c = e.data[s];
          null !== c.setInput ? c.setInput(u, o, r, a) : (u[a] = o);
        }
      }
      function Wi(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = la(o, a))
              : 2 == i && (r = la(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function qi(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(Ie(i)), gt(i)))
            for (let a = Le; a < i.length; a++) {
              const u = i[a],
                c = u[x].firstChild;
              null !== c && qi(u[x], u, c, r);
            }
          const s = n.type;
          if (8 & s) qi(e, t, n.child, r);
          else if (32 & s) {
            const a = Xa(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = qf(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = uo(t[Pe]);
              qi(u[x], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class mo {
        get rootNodes() {
          const t = this._lView,
            n = t[x];
          return qi(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[de];
        }
        set context(t) {
          this._lView[de] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[V]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[ce];
            if (gt(t)) {
              const n = t[fi],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (ru(t, r), Ei(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          jf(this._lView[x], this._lView);
        }
        onDestroy(t) {
          !(function Wp(e, t, n, r) {
            const o = Xp(t);
            null === n
              ? o.push(r)
              : (o.push(n), e.firstCreatePass && Jp(e).push(r, o.length - 1));
          })(this._lView[x], this._lView, null, t);
        }
        markForCheck() {
          zi(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[V] &= -65;
        }
        reattach() {
          this._lView[V] |= 64;
        }
        detectChanges() {
          Gi(this._lView[x], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new w(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function hC(e, t) {
              co(e, t, t[B], 2, null, null);
            })(this._lView[x], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new w(902, !1);
          this._appRef = t;
        }
      }
      class I1 extends mo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Gi(t[x], t, t[de], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class nh extends ho {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = J(t);
          return new yo(n, this.ngModule);
        }
      }
      function rh(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class T1 {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = si(r);
          const o = this.injector.get(t, xu, r);
          return o !== xu || n === xu ? o : this.parentInjector.get(t, n, r);
        }
      }
      class yo extends Cp {
        get inputs() {
          return rh(this.componentDef.inputs);
        }
        get outputs() {
          return rh(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function O_(e) {
              return e.map(P_).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof Yt ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new T1(t, i) : t,
            a = s.get(xp, null);
          if (null === a) throw new w(407, !1);
          const u = s.get(f_, null),
            c = a.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function o1(e, t, n) {
                  return e.selectRootElement(t, n === It.ShadowDom);
                })(c, r, this.componentDef.encapsulation)
              : nu(
                  c,
                  l,
                  (function M1(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(l)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            p = Fu(0, null, null, 1, 0, null, null, null, null, null),
            h = Ui(null, p, null, f, null, null, a, c, u, s, null);
          let g, y;
          Aa(h);
          try {
            const D = this.componentDef;
            let _,
              m = null;
            D.findHostDirectiveDefs
              ? ((_ = []),
                (m = new Map()),
                D.findHostDirectiveDefs(D, _, m),
                _.push(D))
              : (_ = [D]);
            const E = (function R1(e, t) {
                const n = e[x],
                  r = se;
                return (e[r] = t), fr(n, r, 2, "#host", null);
              })(h, d),
              Q = (function P1(e, t, n, r, o, i, s, a) {
                const u = o[x];
                !(function O1(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = Jr(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Wi(t, t.mergedAttrs, !0), null !== n && Qf(r, n, t));
                })(r, e, t, s);
                const c = i.createRenderer(t, n),
                  l = Ui(
                    o,
                    Gp(n),
                    null,
                    n.onPush ? 32 : 16,
                    o[e.index],
                    e,
                    i,
                    c,
                    a || null,
                    null,
                    null
                  );
                return (
                  u.firstCreatePass && Lu(u, e, r.length - 1),
                  Hi(o, l),
                  (o[e.index] = l)
                );
              })(E, d, D, _, h, a, c);
            (y = Fd(p, se)),
              d &&
                (function F1(e, t, n, r) {
                  if (r) Na(e, n, ["ng-version", p_.full]);
                  else {
                    const { attrs: o, classes: i } = (function N_(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!yt(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && Na(e, n, o),
                      i && i.length > 0 && Zf(e, n, i.join(" "));
                  }
                })(c, D, d, r),
              void 0 !== n &&
                (function k1(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(y, this.ngContentSelectors, n),
              (g = (function N1(e, t, n, r, o, i) {
                const s = Me(),
                  a = o[x],
                  u = Je(s, o);
                Zp(a, o, s, n, null, r);
                for (let l = 0; l < n.length; l++)
                  Oe(Mn(o, a, s.directiveStart + l, s), o);
                Qp(a, o, s), u && Oe(u, o);
                const c = Mn(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[de] = o[de] = c), null !== i))
                  for (const l of i) l(c, t);
                return Pu(a, s, e), c;
              })(Q, D, _, m, h, [L1])),
              Ru(p, h, null);
          } finally {
            Ra();
          }
          return new A1(this.componentType, g, ur(y, h), h, y);
        }
      }
      class A1 extends s_ {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new I1(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            const i = this._rootLView;
            Uu(i[x], i, o, t, n), zi(Ge(this._tNode.index, i));
          }
        }
        get injector() {
          return new Xn(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function L1() {
        const e = Me();
        mi(v()[x], e);
      }
      function zu(e, t, n, r) {
        const o = v();
        return (
          (function Ne(e, t, n) {
            return !Object.is(e[t], n) && ((e[t] = n), !0);
          })(
            o,
            (function Qn() {
              return L.lFrame.bindingIndex++;
            })(),
            t
          ) &&
            (q(),
            Pt(
              (function ae() {
                const e = L.lFrame;
                return Fd(e.tView, e.selectedIndex);
              })(),
              o,
              e,
              t,
              n,
              r
            )),
          zu
        );
      }
      function Gu(e, t, n, r, o) {
        const s = o ? "class" : "style";
        Uu(e, n, t.inputs[s], s, r);
      }
      function S(e, t, n, r) {
        const o = v(),
          i = q(),
          s = se + e,
          a = o[B],
          u = i.firstCreatePass
            ? (function tx(e, t, n, r, o, i) {
                const s = t.consts,
                  u = fr(t, e, 2, r, un(s, o));
                return (
                  (function ku(e, t, n, r) {
                    if (jd()) {
                      const o = null === r ? null : { "": -1 },
                        i = (function h1(e, t) {
                          const n = e.directiveRegistry;
                          let r = null,
                            o = null;
                          if (n)
                            for (let i = 0; i < n.length; i++) {
                              const s = n[i];
                              if (Mp(t, s.selectors, !1))
                                if ((r || (r = []), mt(s)))
                                  if (null !== s.findHostDirectiveDefs) {
                                    const a = [];
                                    (o = o || new Map()),
                                      s.findHostDirectiveDefs(s, a, o),
                                      r.unshift(...a, s),
                                      Lu(e, t, a.length);
                                  } else r.unshift(s), Lu(e, t, 0);
                                else
                                  (o = o || new Map()),
                                    s.findHostDirectiveDefs?.(s, r, o),
                                    r.push(s);
                            }
                          return null === r ? null : [r, o];
                        })(e, n);
                      let s, a;
                      null === i ? (s = a = null) : ([s, a] = i),
                        null !== s && Zp(e, t, n, s, o, a),
                        o &&
                          (function g1(e, t, n) {
                            if (t) {
                              const r = (e.localNames = []);
                              for (let o = 0; o < t.length; o += 2) {
                                const i = n[t[o + 1]];
                                if (null == i) throw new w(-301, !1);
                                r.push(t[o], i);
                              }
                            }
                          })(n, r, o);
                    }
                    n.mergedAttrs = Jr(n.mergedAttrs, n.attrs);
                  })(t, n, u, un(s, i)),
                  null !== u.attrs && Wi(u, u.attrs, !1),
                  null !== u.mergedAttrs && Wi(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          c = (o[s] = nu(
            a,
            t,
            (function pw() {
              return L.lFrame.currentNamespace;
            })()
          )),
          l = pi(u);
        return (
          At(u, !0),
          Qf(a, c, u),
          32 != (32 & u.flags) && Ai(i, o, c, u),
          0 ===
            (function ZD() {
              return L.lFrame.elementDepthCount;
            })() && Oe(c, o),
          (function QD() {
            L.lFrame.elementDepthCount++;
          })(),
          l &&
            ((function Ou(e, t, n) {
              jd() &&
                ((function f1(e, t, n, r) {
                  const o = n.directiveStart,
                    i = n.directiveEnd;
                  Qr(n) &&
                    (function D1(e, t, n) {
                      const r = Je(t, e),
                        o = Gp(n),
                        i = e[li],
                        s = Hi(
                          e,
                          Ui(
                            e,
                            o,
                            null,
                            n.onPush ? 32 : 16,
                            r,
                            t,
                            i,
                            i.createRenderer(r, n),
                            null,
                            null,
                            null
                          )
                        );
                      e[t.index] = s;
                    })(t, n, e.data[o + n.componentOffset]),
                    e.firstCreatePass || _i(n, t),
                    Oe(r, t);
                  const s = n.initialInputs;
                  for (let a = o; a < i; a++) {
                    const u = e.data[a],
                      c = Mn(t, e, a, n);
                    Oe(c, t),
                      null !== s && w1(0, a - o, c, u, 0, s),
                      mt(u) && (Ge(n.index, t)[de] = Mn(t, e, a, n));
                  }
                })(e, t, n, Je(n, t)),
                64 == (64 & n.flags) && Qp(e, t, n));
            })(i, o, u),
            Pu(i, u, o)),
          null !== r &&
            (function Nu(e, t, n = Je) {
              const r = t.localNames;
              if (null !== r) {
                let o = t.index + 1;
                for (let i = 0; i < r.length; i += 2) {
                  const s = r[i + 1],
                    a = -1 === s ? n(t, e) : e[s];
                  e[o++] = a;
                }
              }
            })(o, u),
          S
        );
      }
      function b() {
        let e = Me();
        Ea()
          ? (function Sa() {
              L.lFrame.isParent = !1;
            })()
          : ((e = e.parent), At(e, !1));
        const t = e;
        !(function KD() {
          L.lFrame.elementDepthCount--;
        })();
        const n = q();
        return (
          n.firstCreatePass && (mi(n, e), _a(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function yw(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            Gu(n, t, v(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function vw(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Gu(n, t, v(), t.stylesWithoutHost, !1),
          b
        );
      }
      function ee(e, t, n, r) {
        return S(e, t, n, r), b(), ee;
      }
      function Qi(e) {
        return !!e && "function" == typeof e.then;
      }
      const Ch = function wh(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function Yu(e, t, n, r) {
        const o = v(),
          i = q(),
          s = Me();
        return (
          (function xh(e, t, n, r, o, i, s) {
            const a = pi(r),
              c = e.firstCreatePass && Jp(e),
              l = t[de],
              d = Xp(t);
            let f = !0;
            if (3 & r.type || s) {
              const g = Je(r, t),
                y = s ? s(g) : g,
                D = d.length,
                _ = s ? (E) => s(Ie(E[r.index])) : r.index;
              let m = null;
              if (
                (!s &&
                  a &&
                  (m = (function ox(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[Gn],
                            u = o[i + 2];
                          return a.length > u ? a[u] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== m)
              )
                ((m.__ngLastListenerFn__ || m).__ngNextListenerFn__ = i),
                  (m.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = Eh(r, t, l, i, !1);
                const E = n.listen(y, o, i);
                d.push(i, E), c && c.push(o, _, D, D + 1);
              }
            } else i = Eh(r, t, l, i, !1);
            const p = r.outputs;
            let h;
            if (f && null !== p && (h = p[o])) {
              const g = h.length;
              if (g)
                for (let y = 0; y < g; y += 2) {
                  const Q = t[h[y]][h[y + 1]].subscribe(i),
                    ge = d.length;
                  d.push(i, Q), c && c.push(o, r.index, ge, -(ge + 1));
                }
            }
          })(i, o, o[B], s, e, t, r),
          Yu
        );
      }
      function bh(e, t, n, r) {
        try {
          return at(6, t, n), !1 !== n(r);
        } catch (o) {
          return th(e, o), !1;
        } finally {
          at(7, t, n);
        }
      }
      function Eh(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          zi(e.componentOffset > -1 ? Ge(e.index, t) : t);
          let u = bh(t, n, r, s),
            c = i.__ngNextListenerFn__;
          for (; c; ) (u = bh(t, n, c, s) && u), (c = c.__ngNextListenerFn__);
          return o && !1 === u && (s.preventDefault(), (s.returnValue = !1)), u;
        };
      }
      function Y(e, t = "") {
        const n = v(),
          r = q(),
          o = e + se,
          i = r.firstCreatePass ? fr(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function tu(e, t) {
            return e.createText(t);
          })(n[B], t));
        Ai(r, n, s, i), At(i, !1);
      }
      const br = "en-US";
      let vg = br;
      class Er {}
      class zg {}
      class Gg extends Er {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new nh(this));
          const r = Ke(t);
          (this._bootstrapComponents = Zt(r.bootstrap)),
            (this._r3Injector = Fp(
              t,
              n,
              [
                { provide: Er, useValue: this },
                { provide: ho, useValue: this.componentFactoryResolver },
              ],
              re(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class ac extends zg {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Gg(this.moduleType, t);
        }
      }
      class Kb extends Er {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new nh(this)),
            (this.instance = null);
          const o = new Dp(
            [
              ...t,
              { provide: Er, useValue: this },
              { provide: ho, useValue: this.componentFactoryResolver },
            ],
            n || Li(),
            r,
            new Set(["environment"])
          );
          (this.injector = o), o.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function rs(e, t, n = null) {
        return new Kb(e, t, n).injector;
      }
      let Xb = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = gp(0, n.type),
                o =
                  r.length > 0
                    ? rs([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, o);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = F({
            token: e,
            providedIn: "environment",
            factory: () => new e(R(Yt)),
          })),
          e
        );
      })();
      function Wg(e) {
        e.getStandaloneInjector = (t) =>
          t.get(Xb).getOrCreateStandaloneInjector(e);
      }
      function cc(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const Ue = class bE extends $t {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = cc(i)), o && (o = cc(o)), s && (s = cc(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof ot && t.add(a), a;
        }
      };
      let wt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = TE), e;
      })();
      function TE() {
        return (function sm(e, t) {
          let n;
          const r = t[e.index];
          if (gt(r)) n = r;
          else {
            let o;
            if (8 & e.type) o = Ie(r);
            else {
              const i = t[B];
              o = i.createComment("");
              const s = Je(e, t);
              An(
                i,
                Ti(i, s),
                o,
                (function CC(e, t) {
                  return e.nextSibling(t);
                })(i, s),
                !1
              );
            }
            (t[e.index] = n =
              (function Kp(e, t, n, r) {
                return [e, !0, !1, t, null, 0, r, n, null, null];
              })(r, t, o, e)),
              Hi(t, n);
          }
          return new om(n, e, t);
        })(Me(), v());
      }
      const AE = wt,
        om = class extends AE {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return ur(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Xn(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = La(this._hostTNode, this._hostLView);
            if (Jd(t)) {
              const n = wi(t, this._hostLView),
                r = Di(t);
              return new Xn(n[x].data[r + 8], n);
            }
            return new Xn(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = im(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - Le;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = t.createEmbeddedView(n || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function to(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const u = s ? t : new yo(J(t)),
              c = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const f = (s ? c : this.parentInjector).get(Yt, null);
              f && (i = f);
            }
            const l = u.create(c, o, void 0, i);
            return this.insert(l.hostView, a), l;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[x];
            if (
              (function YD(e) {
                return gt(e[ce]);
              })(r)
            ) {
              const l = this.indexOf(t);
              if (-1 !== l) this.detach(l);
              else {
                const d = r[ce],
                  f = new om(d, d[Re], d[ce]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function mC(e, t, n, r) {
              const o = Le + r,
                i = n.length;
              r > 0 && (n[o - 1][ht] = t),
                r < i - Le
                  ? ((t[ht] = n[o]), hf(n, Le + r, t))
                  : (n.push(t), (t[ht] = null)),
                (t[ce] = n);
              const s = t[Yr];
              null !== s &&
                n !== s &&
                (function yC(e, t) {
                  const n = e[Yn];
                  t[Pe] !== t[ce][ce][Pe] && (e[Id] = !0),
                    null === n ? (e[Yn] = [t]) : n.push(t);
                })(s, t);
              const a = t[Tt];
              null !== a && a.insertView(e), (t[V] |= 64);
            })(o, r, s, i);
            const a = su(i, s),
              u = r[B],
              c = Ti(u, s[di]);
            return (
              null !== c &&
                (function pC(e, t, n, r, o, i) {
                  (r[zt] = o), (r[Re] = t), co(e, r, n, 1, o, i);
                })(o, s[Re], u, r, c, a),
              t.attachToViewContainerRef(),
              hf(dc(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = im(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = ru(this._lContainer, n);
            r && (Ei(dc(this._lContainer), n), jf(r[x], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = ru(this._lContainer, n);
            return r && null != Ei(dc(this._lContainer), n) ? new mo(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function im(e) {
        return e[fi];
      }
      function dc(e) {
        return e[fi] || (e[fi] = []);
      }
      function ss(...e) {}
      const as = new P("Application Initializer");
      let us = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = ss),
              (this.reject = ss),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (Qi(i)) n.push(i);
                else if (Ch(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(as, 8));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Mo = new P("AppId", {
        providedIn: "root",
        factory: function Pm() {
          return `${_c()}${_c()}${_c()}`;
        },
      });
      function _c() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Om = new P("Platform Initializer"),
        Nm = new P("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        });
      let oS = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const Jt = new P("LocaleId", {
        providedIn: "root",
        factory: () =>
          W(Jt, A.Optional | A.SkipSelf) ||
          (function iS() {
            return (typeof $localize < "u" && $localize.locale) || br;
          })(),
      });
      class aS {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let Fm = (() => {
        class e {
          compileModuleSync(n) {
            return new ac(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = Zt(Ke(n).declarations).reduce((s, a) => {
                const u = J(a);
                return u && s.push(new yo(u)), s;
              }, []);
            return new aS(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const lS = (() => Promise.resolve(0))();
      function xc(e) {
        typeof Zone > "u"
          ? lS.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class fe {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Ue(!1)),
            (this.onMicrotaskEmpty = new Ue(!1)),
            (this.onStable = new Ue(!1)),
            (this.onError = new Ue(!1)),
            typeof Zone > "u")
          )
            throw new w(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function dS() {
              let e = ie.requestAnimationFrame,
                t = ie.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function hS(e) {
              const t = () => {
                !(function pS(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(ie, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Ec(e),
                                (e.isCheckStableRunning = !0),
                                bc(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Ec(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return jm(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      $m(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return jm(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), $m(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Ec(e),
                          bc(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!fe.isInAngularZone()) throw new w(909, !1);
        }
        static assertNotInAngularZone() {
          if (fe.isInAngularZone()) throw new w(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, fS, ss, ss);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const fS = {};
      function bc(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Ec(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function jm(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function $m(e) {
        e._nesting--, bc(e);
      }
      class gS {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Ue()),
            (this.onMicrotaskEmpty = new Ue()),
            (this.onStable = new Ue()),
            (this.onError = new Ue());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const Vm = new P(""),
        cs = new P("");
      let Mc,
        Sc = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Mc ||
                  ((function mS(e) {
                    Mc = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      fe.assertNotInAngularZone(),
                        xc(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                xc(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(fe), R(Ic), R(cs));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Ic = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Mc?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = F({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })();
      const en = !1;
      let fn = null;
      const Um = new P("AllowMultipleToken"),
        Tc = new P("PlatformDestroyListeners"),
        Bm = new P("appBootstrapListener");
      class Hm {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function Gm(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new P(r);
        return (i = []) => {
          let s = Ac();
          if (!s || s.injector.get(Um, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function DS(e) {
                  if (fn && !fn.get(Um, !1)) throw new w(400, !1);
                  fn = e;
                  const t = e.get(qm);
                  (function zm(e) {
                    const t = e.get(Om, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function Wm(e = [], t) {
                    return Qt.create({
                      name: t,
                      providers: [
                        { provide: Du, useValue: "platform" },
                        { provide: Tc, useValue: new Set([() => (fn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function CS(e) {
            const t = Ac();
            if (!t) throw new w(401, !1);
            return t;
          })();
        };
      }
      function Ac() {
        return fn?.get(qm) ?? null;
      }
      let qm = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function Zm(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new gS()
                      : ("zone.js" === e ? void 0 : e) || new fe(t)),
                  n
                );
              })(
                r?.ngZone,
                (function Ym(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: fe, useValue: o }];
            return o.run(() => {
              const s = Qt.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(s),
                u = a.injector.get(cr, null);
              if (!u) throw new w(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const c = o.onError.subscribe({
                    next: (l) => {
                      u.handleError(l);
                    },
                  });
                  a.onDestroy(() => {
                    ds(this._modules, a), c.unsubscribe();
                  });
                }),
                (function Qm(e, t, n) {
                  try {
                    const r = n();
                    return Qi(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(u, o, () => {
                  const c = a.injector.get(us);
                  return (
                    c.runInitializers(),
                    c.donePromise.then(
                      () => (
                        (function Dg(e) {
                          it(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (vg = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(Jt, br) || br),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = Km({}, r);
            return (function yS(e, t, n) {
              const r = new ac(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(ls);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new w(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new w(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(Tc, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(Qt));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function Km(e, t) {
        return Array.isArray(t) ? t.reduce(Km, e) : { ...e, ...t };
      }
      let ls = (() => {
        class e {
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          constructor(n, r, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new De((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new De((a) => {
                let u;
                this._zone.runOutsideAngular(() => {
                  u = this._zone.onStable.subscribe(() => {
                    fe.assertNotInAngularZone(),
                      xc(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const c = this._zone.onUnstable.subscribe(() => {
                  fe.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  u.unsubscribe(), c.unsubscribe();
                };
              });
            this.isStable = (function pD(...e) {
              const t = Br(e),
                n = (function sD(e, t) {
                  return "number" == typeof aa(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? pt(r[0])
                  : Bn(n)(we(r, t))
                : Et;
            })(
              i,
              s.pipe(
                (function hD(e = {}) {
                  const {
                    connector: t = () => new $t(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s,
                      a,
                      u,
                      c = 0,
                      l = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      p = () => {
                        f(), (s = u = void 0), (l = d = !1);
                      },
                      h = () => {
                        const g = s;
                        p(), g?.unsubscribe();
                      };
                    return be((g, y) => {
                      c++, !d && !l && f();
                      const D = (u = u ?? t());
                      y.add(() => {
                        c--, 0 === c && !d && !l && (a = ua(h, o));
                      }),
                        D.subscribe(y),
                        !s &&
                          c > 0 &&
                          ((s = new Ur({
                            next: (_) => D.next(_),
                            error: (_) => {
                              (d = !0), f(), (a = ua(p, n, _)), D.error(_);
                            },
                            complete: () => {
                              (l = !0), f(), (a = ua(p, r)), D.complete();
                            },
                          })),
                          pt(g).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          bootstrap(n, r) {
            const o = n instanceof Cp;
            if (!this._injector.get(us).done) {
              !o &&
                (function zn(e) {
                  const t = J(e) || Ae(e) || ze(e);
                  return null !== t && t.standalone;
                })(n);
              throw new w(405, en);
            }
            let s;
            (s = o ? n : this._injector.get(ho).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function vS(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Er),
              c = s.create(Qt.NULL, [], r || s.selector, a),
              l = c.location.nativeElement,
              d = c.injector.get(Vm, null);
            return (
              d?.registerApplication(l),
              c.onDestroy(() => {
                this.detachView(c.hostView),
                  ds(this.components, c),
                  d?.unregisterApplication(l);
              }),
              this._loadComponent(c),
              c
            );
          }
          tick() {
            if (this._runningTick) throw new w(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            ds(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(Bm, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => ds(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new w(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(fe), R(Yt), R(cr));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function ds(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let Rc = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = xS), e;
      })();
      function xS(e) {
        return (function bS(e, t, n) {
          if (Qr(e) && !n) {
            const r = Ge(e.index, t);
            return new mo(r, r);
          }
          return 47 & e.type ? new mo(t[Pe], t) : null;
        })(Me(), v(), 16 == (16 & e));
      }
      const LS = Gm(null, "core", []);
      let jS = (() => {
        class e {
          constructor(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(ls));
          }),
          (e.ɵmod = xn({ type: e })),
          (e.ɵinj = an({})),
          e
        );
      })();
      function kc(e) {
        return "boolean" == typeof e ? e : null != e && "false" !== e;
      }
      let Lc = null;
      function kn() {
        return Lc;
      }
      class US {}
      const Ye = new P("DocumentToken");
      let jc = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = F({
            token: e,
            factory: function () {
              return (function BS() {
                return R(uy);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const HS = new P("Location Initialized");
      let uy = (() => {
        class e extends jc {
          constructor(n) {
            super(),
              (this._doc = n),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return kn().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = kn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = kn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, r, o) {
            cy() ? this._history.pushState(n, r, o) : (this._location.hash = o);
          }
          replaceState(n, r, o) {
            cy()
              ? this._history.replaceState(n, r, o)
              : (this._location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(Ye));
          }),
          (e.ɵprov = F({
            token: e,
            factory: function () {
              return (function zS() {
                return new uy(R(Ye));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function cy() {
        return !!window.history.pushState;
      }
      function $c(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function ly(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function tn(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Ln = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = F({
            token: e,
            factory: function () {
              return W(fy);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const dy = new P("appBaseHref");
      let fy = (() => {
          class e extends Ln {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  W(Ye).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return $c(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  tn(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + tn(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + tn(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(jc), R(dy, 8));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        GS = (() => {
          class e extends Ln {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = $c(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + tn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + tn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(jc), R(dy, 8));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Vc = (() => {
          class e {
            constructor(n) {
              (this._subject = new Ue()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function YS(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(ly(py(r)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + tn(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function qS(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const n = t.substring(e.length);
                  return "" === n || ["/", ";", "?", "#"].includes(n[0])
                    ? n
                    : t;
                })(this._basePath, py(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._locationStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + tn(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + tn(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = tn),
            (e.joinWithSlash = $c),
            (e.stripTrailingSlash = ly),
            (e.ɵfac = function (n) {
              return new (n || e)(R(Ln));
            }),
            (e.ɵprov = F({
              token: e,
              factory: function () {
                return (function WS() {
                  return new Vc(R(Ln));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function py(e) {
        return e.replace(/\/index.html$/, "");
      }
      let cM = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = xn({ type: e })),
          (e.ɵinj = an({})),
          e
        );
      })();
      let pM = (() => {
        class e {}
        return (
          (e.ɵprov = F({
            token: e,
            providedIn: "root",
            factory: () => new hM(R(Ye), window),
          })),
          e
        );
      })();
      class hM {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function gM(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              Ay(this.window.history) ||
              Ay(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function Ay(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class HM extends US {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class rl extends HM {
        static makeCurrent() {
          !(function VS(e) {
            Lc || (Lc = e);
          })(new rl());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function zM() {
            return (
              (Oo = Oo || document.querySelector("base")),
              Oo ? Oo.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function GM(e) {
                (Ss = Ss || document.createElement("a")),
                  Ss.setAttribute("href", e);
                const t = Ss.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Oo = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function RI(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let Ss,
        Oo = null;
      const Fy = new P("TRANSITION_ID"),
        qM = [
          {
            provide: as,
            useFactory: function WM(e, t, n) {
              return () => {
                n.get(us).donePromise.then(() => {
                  const r = kn(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [Fy, Ye, Qt],
            multi: !0,
          },
        ];
      let ZM = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Is = new P("EventManagerPlugins");
      let Ms = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(Is), R(fe));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class ky {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = kn().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let Ly = (() => {
          class e {
            constructor() {
              this.usageCount = new Map();
            }
            addStyles(n) {
              for (const r of n)
                1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
            }
            removeStyles(n) {
              for (const r of n)
                0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r);
            }
            onStyleRemoved(n) {}
            onStyleAdded(n) {}
            getAllStyles() {
              return this.usageCount.keys();
            }
            changeUsageCount(n, r) {
              const o = this.usageCount;
              let i = o.get(n) ?? 0;
              return (i += r), i > 0 ? o.set(n, i) : o.delete(n), i;
            }
            ngOnDestroy() {
              for (const n of this.getAllStyles()) this.onStyleRemoved(n);
              this.usageCount.clear();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        No = (() => {
          class e extends Ly {
            constructor(n) {
              super(),
                (this.doc = n),
                (this.styleRef = new Map()),
                (this.hostNodes = new Set()),
                this.resetHostNodes();
            }
            onStyleAdded(n) {
              for (const r of this.hostNodes) this.addStyleToHost(r, n);
            }
            onStyleRemoved(n) {
              const r = this.styleRef;
              r.get(n)?.forEach((i) => i.remove()), r.delete(n);
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this.styleRef.clear(), this.resetHostNodes();
            }
            addHost(n) {
              this.hostNodes.add(n);
              for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
            }
            removeHost(n) {
              this.hostNodes.delete(n);
            }
            addStyleToHost(n, r) {
              const o = this.doc.createElement("style");
              (o.textContent = r), n.appendChild(o);
              const i = this.styleRef.get(r);
              i ? i.push(o) : this.styleRef.set(r, [o]);
            }
            resetHostNodes() {
              const n = this.hostNodes;
              n.clear(), n.add(this.doc.head);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(Ye));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const ol = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        il = /%COMP%/g,
        Vy = new P("RemoveStylesOnCompDestory", {
          providedIn: "root",
          factory: () => !1,
        });
      function Uy(e, t) {
        return t.flat(100).map((n) => n.replace(il, e));
      }
      function By(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let sl = (() => {
        class e {
          constructor(n, r, o, i) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestory = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new al(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            const o = this.getOrCreateRenderer(n, r);
            return (
              o instanceof Gy
                ? o.applyToHost(n)
                : o instanceof ul && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.eventManager,
                a = this.sharedStylesHost,
                u = this.removeStylesOnCompDestory;
              switch (r.encapsulation) {
                case It.Emulated:
                  i = new Gy(s, a, r, this.appId, u);
                  break;
                case It.ShadowDom:
                  return new nT(s, a, n, r);
                default:
                  i = new ul(s, a, r, u);
              }
              (i.onDestroy = () => o.delete(r.id)), o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(Ms), R(No), R(Mo), R(Vy));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class al {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(ol[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (zy(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (zy(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = ol[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = ol[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (We.DashCase | We.Important)
            ? t.style.setProperty(n, r, o & We.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & We.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, By(r))
            : this.eventManager.addEventListener(t, n, By(r));
        }
      }
      function zy(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class nT extends al {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = Uy(o.id, o.styles);
          for (const s of i) {
            const a = document.createElement("style");
            (a.textContent = s), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class ul extends al {
        constructor(t, n, r, o, i = r.id) {
          super(t),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestory = o),
            (this.rendererUsageCount = 0),
            (this.styles = Uy(i, r.styles));
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles),
            this.rendererUsageCount++;
        }
        destroy() {
          this.removeStylesOnCompDestory &&
            (this.sharedStylesHost.removeStyles(this.styles),
            this.rendererUsageCount--,
            0 === this.rendererUsageCount && this.onDestroy?.());
        }
      }
      class Gy extends ul {
        constructor(t, n, r, o, i) {
          const s = o + "-" + r.id;
          super(t, n, r, i, s),
            (this.contentAttr = (function JM(e) {
              return "_ngcontent-%COMP%".replace(il, e);
            })(s)),
            (this.hostAttr = (function eT(e) {
              return "_nghost-%COMP%".replace(il, e);
            })(s));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let rT = (() => {
        class e extends ky {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(Ye));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Wy = ["alt", "control", "meta", "shift"],
        oT = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        iT = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let sT = (() => {
        class e extends ky {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => kn().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              Wy.forEach((c) => {
                const l = r.indexOf(c);
                l > -1 && (r.splice(l, 1), (s += c + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const u = {};
            return (u.domEventName = o), (u.fullKey = s), u;
          }
          static matchEventFullKeyCode(n, r) {
            let o = oT[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                Wy.forEach((s) => {
                  s !== o && (0, iT[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(Ye));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const lT = Gm(LS, "browser", [
          { provide: Nm, useValue: "browser" },
          {
            provide: Om,
            useValue: function aT() {
              rl.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: Ye,
            useFactory: function cT() {
              return (
                (function TC(e) {
                  lu = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        Zy = new P(""),
        Qy = [
          {
            provide: cs,
            useClass: class YM {
              addToWindow(t) {
                (ie.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (ie.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (ie.getAllAngularRootElements = () => t.getAllRootElements()),
                  ie.frameworkStabilizers || (ie.frameworkStabilizers = []),
                  ie.frameworkStabilizers.push((r) => {
                    const o = ie.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach(function (u) {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? kn().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: Vm, useClass: Sc, deps: [fe, Ic, cs] },
          { provide: Sc, useClass: Sc, deps: [fe, Ic, cs] },
        ],
        Ky = [
          { provide: Du, useValue: "root" },
          {
            provide: cr,
            useFactory: function uT() {
              return new cr();
            },
            deps: [],
          },
          { provide: Is, useClass: rT, multi: !0, deps: [Ye, fe, Nm] },
          { provide: Is, useClass: sT, multi: !0, deps: [Ye] },
          { provide: sl, useClass: sl, deps: [Ms, No, Mo, Vy] },
          { provide: xp, useExisting: sl },
          { provide: Ly, useExisting: No },
          { provide: No, useClass: No, deps: [Ye] },
          { provide: Ms, useClass: Ms, deps: [Is, fe] },
          { provide: class mM {}, useClass: ZM, deps: [] },
          [],
        ];
      let dT = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: Mo, useValue: n.appId },
                  { provide: Fy, useExisting: Mo },
                  qM,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(Zy, 12));
            }),
            (e.ɵmod = xn({ type: e })),
            (e.ɵinj = an({ providers: [...Ky, ...Qy], imports: [cM, jS] })),
            e
          );
        })(),
        Xy = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(Ye));
            }),
            (e.ɵprov = F({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function pT() {
                        return new Xy(R(Ye));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function M(...e) {
        return we(e, Br(e));
      }
      typeof window < "u" && window;
      class bt extends $t {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const Ts = $r(
          (e) =>
            function () {
              e(this),
                (this.name = "EmptyError"),
                (this.message = "no elements in sequence");
            }
        ),
        { isArray: DT } = Array,
        { getPrototypeOf: wT, prototype: CT, keys: _T } = Object;
      const { isArray: ET } = Array;
      function tv(...e) {
        const t = Br(e),
          n = (function iD(e) {
            return ne(aa(e)) ? e.pop() : void 0;
          })(e),
          { args: r, keys: o } = (function xT(e) {
            if (1 === e.length) {
              const t = e[0];
              if (DT(t)) return { args: t, keys: null };
              if (
                (function bT(e) {
                  return e && "object" == typeof e && wT(e) === CT;
                })(t)
              ) {
                const n = _T(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e);
        if (0 === r.length) return we([], t);
        const i = new De(
          (function TT(e, t, n = _n) {
            return (r) => {
              nv(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let u = 0; u < o; u++)
                    nv(
                      t,
                      () => {
                        const c = we(e[u], t);
                        let l = !1;
                        c.subscribe(
                          Ee(
                            r,
                            (d) => {
                              (i[u] = d),
                                l || ((l = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(
            r,
            t,
            o
              ? (s) =>
                  (function MT(e, t) {
                    return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
                  })(o, s)
              : _n
          )
        );
        return n
          ? i.pipe(
              (function IT(e) {
                return G((t) =>
                  (function ST(e, t) {
                    return ET(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(n)
            )
          : i;
      }
      function nv(e, t, n) {
        e ? Vt(n, e, t) : t();
      }
      function dl(...e) {
        return (function AT() {
          return Bn(1);
        })()(we(e, Br(e)));
      }
      function rv(e) {
        return new De((t) => {
          pt(e()).subscribe(t);
        });
      }
      function Fo(e, t) {
        const n = ne(e) ? e : () => e,
          r = (o) => o.error(n());
        return new De(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function fl() {
        return be((e, t) => {
          let n = null;
          e._refCount++;
          const r = Ee(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class ov extends De {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Ql(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new ot();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                Ee(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = ot.EMPTY));
          }
          return t;
        }
        refCount() {
          return fl()(this);
        }
      }
      function kt(e, t) {
        return be((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            Ee(
              r,
              (u) => {
                o?.unsubscribe();
                let c = 0;
                const l = i++;
                pt(e(u, l)).subscribe(
                  (o = Ee(
                    r,
                    (d) => r.next(t ? t(u, d, l, c++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Mr(e) {
        return e <= 0
          ? () => Et
          : be((t, n) => {
              let r = 0;
              t.subscribe(
                Ee(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function hn(e, t) {
        return be((n, r) => {
          let o = 0;
          n.subscribe(Ee(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function As(e) {
        return be((t, n) => {
          let r = !1;
          t.subscribe(
            Ee(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function iv(e = PT) {
        return be((t, n) => {
          let r = !1;
          t.subscribe(
            Ee(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function PT() {
        return new Ts();
      }
      function gn(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? hn((o, i) => e(o, i, r)) : _n,
            Mr(1),
            n ? As(t) : iv(() => new Ts())
          );
      }
      function jn(e, t) {
        return ne(t) ? Se(e, t, 1) : Se(e, 1);
      }
      function Fe(e, t, n) {
        const r = ne(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? be((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                Ee(
                  i,
                  (u) => {
                    var c;
                    null === (c = r.next) || void 0 === c || c.call(r, u),
                      i.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      i.complete();
                  },
                  (u) => {
                    var c;
                    (a = !1),
                      null === (c = r.error) || void 0 === c || c.call(r, u),
                      i.error(u);
                  },
                  () => {
                    var u, c;
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (c = r.finalize) || void 0 === c || c.call(r);
                  }
                )
              );
            })
          : _n;
      }
      function mn(e) {
        return be((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            Ee(n, void 0, void 0, (s) => {
              (i = pt(e(s, mn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function sv(e, t) {
        return be(
          (function OT(e, t, n, r, o) {
            return (i, s) => {
              let a = n,
                u = t,
                c = 0;
              i.subscribe(
                Ee(
                  s,
                  (l) => {
                    const d = c++;
                    (u = a ? e(u, l, d) : ((a = !0), l)), r && s.next(u);
                  },
                  o &&
                    (() => {
                      a && s.next(u), s.complete();
                    })
                )
              );
            };
          })(e, t, arguments.length >= 2, !0)
        );
      }
      function pl(e) {
        return e <= 0
          ? () => Et
          : be((t, n) => {
              let r = [];
              t.subscribe(
                Ee(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function av(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? hn((o, i) => e(o, i, r)) : _n,
            pl(1),
            n ? As(t) : iv(() => new Ts())
          );
      }
      function hl(e) {
        return be((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const $ = "primary",
        ko = Symbol("RouteTitle");
      class kT {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Tr(e) {
        return new kT(e);
      }
      function LT(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function Lt(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !uv(e[o], t[o]))) return !1;
        return !0;
      }
      function uv(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function cv(e) {
        return Array.prototype.concat.apply([], e);
      }
      function lv(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Te(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function yn(e) {
        return Ch(e) ? e : Qi(e) ? we(Promise.resolve(e)) : M(e);
      }
      const Rs = !1,
        $T = {
          exact: function pv(e, t, n) {
            if (
              !$n(e.segments, t.segments) ||
              !Ps(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !pv(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: hv,
        },
        dv = {
          exact: function VT(e, t) {
            return Lt(e, t);
          },
          subset: function UT(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => uv(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function fv(e, t, n) {
        return (
          $T[n.paths](e.root, t.root, n.matrixParams) &&
          dv[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function hv(e, t, n) {
        return gv(e, t, t.segments, n);
      }
      function gv(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!$n(o, n) || t.hasChildren() || !Ps(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!$n(e.segments, n) || !Ps(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !hv(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!($n(e.segments, o) && Ps(e.segments, o, r) && e.children[$]) &&
            gv(e.children[$], t, i, r)
          );
        }
      }
      function Ps(e, t, n) {
        return t.every((r, o) => dv[n](e[o].parameters, r.parameters));
      }
      class vn {
        constructor(t = new H([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Tr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return zT.serialize(this);
        }
      }
      class H {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Te(n, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Os(this);
        }
      }
      class Lo {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Tr(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return vv(this);
        }
      }
      function $n(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let jo = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = F({
            token: e,
            factory: function () {
              return new gl();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class gl {
        parse(t) {
          const n = new JT(t);
          return new vn(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${$o(t.root, !0)}`,
            r = (function qT(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${Ns(n)}=${Ns(o)}`).join("&")
                    : `${Ns(n)}=${Ns(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function GT(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const zT = new gl();
      function Os(e) {
        return e.segments.map((t) => vv(t)).join("/");
      }
      function $o(e, t) {
        if (!e.hasChildren()) return Os(e);
        if (t) {
          const n = e.children[$] ? $o(e.children[$], !1) : "",
            r = [];
          return (
            Te(e.children, (o, i) => {
              i !== $ && r.push(`${i}:${$o(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function HT(e, t) {
            let n = [];
            return (
              Te(e.children, (r, o) => {
                o === $ && (n = n.concat(t(r, o)));
              }),
              Te(e.children, (r, o) => {
                o !== $ && (n = n.concat(t(r, o)));
              }),
              n
            );
          })(e, (r, o) =>
            o === $ ? [$o(e.children[$], !1)] : [`${o}:${$o(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[$]
            ? `${Os(e)}/${n[0]}`
            : `${Os(e)}/(${n.join("//")})`;
        }
      }
      function mv(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Ns(e) {
        return mv(e).replace(/%3B/gi, ";");
      }
      function ml(e) {
        return mv(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Fs(e) {
        return decodeURIComponent(e);
      }
      function yv(e) {
        return Fs(e.replace(/\+/g, "%20"));
      }
      function vv(e) {
        return `${ml(e.path)}${(function WT(e) {
          return Object.keys(e)
            .map((t) => `;${ml(t)}=${ml(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const YT = /^[^\/()?;=#]+/;
      function ks(e) {
        const t = e.match(YT);
        return t ? t[0] : "";
      }
      const ZT = /^[^=?&#]+/,
        KT = /^[^&#]+/;
      class JT {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new H([], {})
              : new H([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[$] = new H(t, n)),
            r
          );
        }
        parseSegment() {
          const t = ks(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new w(4009, Rs);
          return this.capture(t), new Lo(Fs(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = ks(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = ks(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[Fs(n)] = Fs(r);
        }
        parseQueryParam(t) {
          const n = (function QT(e) {
            const t = e.match(ZT);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function XT(e) {
              const t = e.match(KT);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = yv(n),
            i = yv(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = ks(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new w(4010, Rs);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = $);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[$] : new H([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new w(4011, Rs);
        }
      }
      function yl(e) {
        return e.segments.length > 0 ? new H([], { [$]: e }) : e;
      }
      function Ls(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = Ls(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function eA(e) {
          if (1 === e.numberOfChildren && e.children[$]) {
            const t = e.children[$];
            return new H(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new H(e.segments, t));
      }
      function Vn(e) {
        return e instanceof vn;
      }
      const vl = !1;
      function tA(e, t, n, r, o) {
        if (0 === n.length) return Ar(t.root, t.root, t.root, r, o);
        const i = (function xv(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new _v(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Te(i.outlets, (u, c) => {
                    a[c] = "string" == typeof u ? u.split("/") : u;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, u) => {
                  (0 == u && "." === a) ||
                    (0 == u && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new _v(n, t, r);
        })(n);
        return i.toRoot()
          ? Ar(t.root, t.root, new H([], {}), r, o)
          : (function s(u) {
              const c = (function rA(e, t, n, r) {
                  if (e.isAbsolute) return new Rr(t.root, !0, 0);
                  if (-1 === r) return new Rr(n, n === t.root, 0);
                  return (function bv(e, t, n) {
                    let r = e,
                      o = t,
                      i = n;
                    for (; i > o; ) {
                      if (((i -= o), (r = r.parent), !r))
                        throw new w(4005, vl && "Invalid number of '../'");
                      o = r.segments.length;
                    }
                    return new Rr(r, !1, o - i);
                  })(n, r + (Vo(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(i, t, e.snapshot?._urlSegment, u),
                l = c.processChildren
                  ? Pr(c.segmentGroup, c.index, i.commands)
                  : Dl(c.segmentGroup, c.index, i.commands);
              return Ar(t.root, c.segmentGroup, l, r, o);
            })(e.snapshot?._lastPathIndex);
      }
      function Vo(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Uo(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Ar(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          Te(r, (u, c) => {
            i[c] = Array.isArray(u) ? u.map((l) => `${l}`) : `${u}`;
          }),
          (s = e === t ? n : Cv(e, t, n));
        const a = yl(Ls(s));
        return new vn(a, i, o);
      }
      function Cv(e, t, n) {
        const r = {};
        return (
          Te(e.children, (o, i) => {
            r[i] = o === t ? n : Cv(o, t, n);
          }),
          new H(e.segments, r)
        );
      }
      class _v {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Vo(r[0]))
          )
            throw new w(
              4003,
              vl && "Root segment cannot have matrix parameters"
            );
          const o = r.find(Uo);
          if (o && o !== lv(r))
            throw new w(4004, vl && "{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Rr {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function Dl(e, t, n) {
        if (
          (e || (e = new H([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return Pr(e, t, n);
        const r = (function iA(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (Uo(a)) break;
              const u = `${a}`,
                c = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === u) break;
              if (u && c && "object" == typeof c && void 0 === c.outlets) {
                if (!Sv(u, c, s)) return i;
                r += 2;
              } else {
                if (!Sv(u, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new H(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[$] = new H(e.segments.slice(r.pathIndex), e.children)),
            Pr(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new H(e.segments, {})
          : r.match && !e.hasChildren()
          ? wl(e, t, n)
          : r.match
          ? Pr(e, 0, o)
          : wl(e, t, n);
      }
      function Pr(e, t, n) {
        if (0 === n.length) return new H(e.segments, {});
        {
          const r = (function oA(e) {
              return Uo(e[0]) ? e[0].outlets : { [$]: e };
            })(n),
            o = {};
          if (
            !r[$] &&
            e.children[$] &&
            1 === e.numberOfChildren &&
            0 === e.children[$].segments.length
          ) {
            const i = Pr(e.children[$], t, n);
            return new H(e.segments, i.children);
          }
          return (
            Te(r, (i, s) => {
              "string" == typeof i && (i = [i]),
                null !== i && (o[s] = Dl(e.children[s], t, i));
            }),
            Te(e.children, (i, s) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new H(e.segments, o)
          );
        }
      }
      function wl(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (Uo(i)) {
            const u = sA(i.outlets);
            return new H(r, u);
          }
          if (0 === o && Vo(n[0])) {
            r.push(new Lo(e.segments[t].path, Ev(n[0]))), o++;
            continue;
          }
          const s = Uo(i) ? i.outlets[$] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && Vo(a)
            ? (r.push(new Lo(s, Ev(a))), (o += 2))
            : (r.push(new Lo(s, {})), o++);
        }
        return new H(r, {});
      }
      function sA(e) {
        const t = {};
        return (
          Te(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = wl(new H([], {}), 0, n));
          }),
          t
        );
      }
      function Ev(e) {
        const t = {};
        return Te(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function Sv(e, t, n) {
        return e == n.path && Lt(t, n.parameters);
      }
      const Bo = "imperative";
      class jt {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class Cl extends jt {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Un extends jt {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class js extends jt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class $s extends jt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class _l extends jt {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class aA extends jt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class uA extends jt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class cA extends jt {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class lA extends jt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class dA extends jt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class fA {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class pA {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class hA {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class gA {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class mA {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class yA {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Iv {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let wA = (() => {
          class e {
            createUrlTree(n, r, o, i, s, a) {
              return tA(n || r.root, o, i, s, a);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        _A = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = F({
              token: e,
              factory: function (t) {
                return wA.ɵfac(t);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class Mv {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = xl(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = xl(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = bl(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return bl(t, this._root).map((n) => n.value);
        }
      }
      function xl(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = xl(e, n);
          if (r) return r;
        }
        return null;
      }
      function bl(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = bl(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class rn {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Or(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class Tv extends Mv {
        constructor(t, n) {
          super(t), (this.snapshot = n), El(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Av(e, t) {
        const n = (function xA(e, t) {
            const s = new Vs([], {}, {}, "", {}, $, t, null, e.root, -1, {});
            return new Pv("", new rn(s, []));
          })(e, t),
          r = new bt([new Lo("", {})]),
          o = new bt({}),
          i = new bt({}),
          s = new bt({}),
          a = new bt(""),
          u = new Nr(r, o, s, a, i, $, t, n.root);
        return (u.snapshot = n.root), new Tv(new rn(u, []), n);
      }
      class Nr {
        constructor(t, n, r, o, i, s, a, u) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(G((c) => c[ko])) ?? M(void 0)),
            (this._futureSnapshot = u);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(G((t) => Tr(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(G((t) => Tr(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Rv(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function bA(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Vs {
        get title() {
          return this.data?.[ko];
        }
        constructor(t, n, r, o, i, s, a, u, c, l, d) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = u),
            (this._urlSegment = c),
            (this._lastPathIndex = l),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Tr(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Tr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class Pv extends Mv {
        constructor(t, n) {
          super(n), (this.url = t), El(this, n);
        }
        toString() {
          return Ov(this._root);
        }
      }
      function El(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => El(e, n));
      }
      function Ov(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(Ov).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Sl(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Lt(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            Lt(t.params, n.params) || e.params.next(n.params),
            (function jT(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Lt(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            Lt(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function Il(e, t) {
        const n =
          Lt(e.params, t.params) &&
          (function BT(e, t) {
            return (
              $n(e, t) && e.every((n, r) => Lt(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || Il(e.parent, t.parent))
        );
      }
      function Ho(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function SA(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return Ho(e, r, o);
              return Ho(e, r);
            });
          })(e, t, n);
          return new rn(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => Ho(e, a))),
                s
              );
            }
          }
          const r = (function IA(e) {
              return new Nr(
                new bt(e.url),
                new bt(e.params),
                new bt(e.queryParams),
                new bt(e.fragment),
                new bt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => Ho(e, i));
          return new rn(r, o);
        }
      }
      const Ml = "ngNavigationCancelingError";
      function Nv(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = Vn(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = Fv(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function Fv(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[Ml] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function kv(e) {
        return Lv(e) && Vn(e.url);
      }
      function Lv(e) {
        return e && e[Ml];
      }
      class MA {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new zo()),
            (this.attachRef = null);
        }
      }
      let zo = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const o = this.getOrCreateContext(n);
            (o.outlet = r), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new MA()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Us = !1;
      let Tl = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = $),
              (this.activateEvents = new Ue()),
              (this.deactivateEvents = new Ue()),
              (this.attachEvents = new Ue()),
              (this.detachEvents = new Ue()),
              (this.parentContexts = W(zo)),
              (this.location = W(wt)),
              (this.changeDetector = W(Rc)),
              (this.environmentInjector = W(Yt));
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: r, previousValue: o } = n.name;
              if (r) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new w(4012, Us);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new w(4012, Us);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new w(4012, Us);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new w(4013, Us);
            this._activatedRoute = n;
            const o = this.location,
              s = n.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              u = new TA(n, a, o.injector);
            if (
              r &&
              (function AA(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const c = r.resolveComponentFactory(s);
              this.activated = o.createComponent(c, o.length, u);
            } else
              this.activated = o.createComponent(s, {
                index: o.length,
                injector: u,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵdir = ke({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [Sn],
          })),
          e
        );
      })();
      class TA {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === Nr
            ? this.route
            : t === zo
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let Al = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Mt({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [Wg],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && ee(0, "router-outlet");
            },
            dependencies: [Tl],
            encapsulation: 2,
          })),
          e
        );
      })();
      function jv(e, t) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = rs(e.providers, t, `Route: ${e.path}`)),
          e._injector ?? t
        );
      }
      function Pl(e) {
        const t = e.children && e.children.map(Pl),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== $ &&
            (n.component = Al),
          n
        );
      }
      function ft(e) {
        return e.outlet || $;
      }
      function $v(e, t) {
        const n = e.filter((r) => ft(r) === t);
        return n.push(...e.filter((r) => ft(r) !== t)), n;
      }
      function Go(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class FA {
        constructor(t, n, r, o) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Sl(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = Or(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Te(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Or(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Or(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = Or(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new yA(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new gA(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((Sl(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Sl(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = Go(o.snapshot),
                u = a?.get(ho) ?? null;
              (s.attachRef = null),
                (s.route = o),
                (s.resolver = u),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class Vv {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Bs {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function kA(e, t, n) {
        const r = e._root;
        return Wo(r, t ? t._root : null, n, [r.value]);
      }
      function Fr(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function CD(e) {
              return null !== ri(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function Wo(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = Or(t);
        return (
          e.children.forEach((s) => {
            (function jA(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const u = (function $A(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !$n(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !$n(e.url, t.url) || !Lt(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Il(e, t) || !Lt(e.queryParams, t.queryParams);
                    default:
                      return !Il(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new Vv(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  Wo(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new Bs(a.outlet.component, s));
              } else
                s && qo(t, a, o),
                  o.canActivateChecks.push(new Vv(r)),
                  Wo(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Te(i, (s, a) => qo(s, n.getContext(a), o)),
          o
        );
      }
      function qo(e, t, n) {
        const r = Or(e),
          o = e.value;
        Te(r, (i, s) => {
          qo(i, o.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new Bs(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function Yo(e) {
        return "function" == typeof e;
      }
      function Ol(e) {
        return e instanceof Ts || "EmptyError" === e?.name;
      }
      const Hs = Symbol("INITIAL_VALUE");
      function kr() {
        return kt((e) =>
          tv(
            e.map((t) =>
              t.pipe(
                Mr(1),
                (function RT(...e) {
                  const t = Br(e);
                  return be((n, r) => {
                    (t ? dl(e, n, t) : dl(e, n)).subscribe(r);
                  });
                })(Hs)
              )
            )
          ).pipe(
            G((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === Hs) return Hs;
                  if (!1 === n || n instanceof vn) return n;
                }
              return !0;
            }),
            hn((t) => t !== Hs),
            Mr(1)
          )
        );
      }
      function Uv(e) {
        return (function x0(...e) {
          return ql(e);
        })(
          Fe((t) => {
            if (Vn(t)) throw Nv(0, t);
          }),
          G((t) => !0 === t)
        );
      }
      const Nl = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function Bv(e, t, n, r, o) {
        const i = Fl(e, t, n);
        return i.matched
          ? (function nR(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? M(
                    o.map((s) => {
                      const a = Fr(s, e);
                      return yn(
                        (function GA(e) {
                          return e && Yo(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(kr(), Uv())
                : M(!0);
            })((r = jv(t, r)), t, n).pipe(G((s) => (!0 === s ? i : { ...Nl })))
          : M(i);
      }
      function Fl(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...Nl }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || LT)(n, e, t);
        if (!o) return { ...Nl };
        const i = {};
        Te(o.posParams, (a, u) => {
          i[u] = a.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function zs(e, t, n, r) {
        if (
          n.length > 0 &&
          (function iR(e, t, n) {
            return n.some((r) => Gs(e, t, r) && ft(r) !== $);
          })(e, n, r)
        ) {
          const i = new H(
            t,
            (function oR(e, t, n, r) {
              const o = {};
              (o[$] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && ft(i) !== $) {
                  const s = new H([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (o[ft(i)] = s);
                }
              return o;
            })(e, t, r, new H(n, e.children))
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function sR(e, t, n) {
            return n.some((r) => Gs(e, t, r));
          })(e, n, r)
        ) {
          const i = new H(
            e.segments,
            (function rR(e, t, n, r, o) {
              const i = {};
              for (const s of r)
                if (Gs(e, n, s) && !o[ft(s)]) {
                  const a = new H([], {});
                  (a._sourceSegment = e),
                    (a._segmentIndexShift = t.length),
                    (i[ft(s)] = a);
                }
              return { ...o, ...i };
            })(e, t, n, r, e.children)
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const o = new H(e.segments, e.children);
        return (
          (o._sourceSegment = e),
          (o._segmentIndexShift = t.length),
          { segmentGroup: o, slicedSegments: n }
        );
      }
      function Gs(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function Hv(e, t, n, r) {
        return (
          !!(ft(e) === r || (r !== $ && Gs(t, n, e))) &&
          ("**" === e.path || Fl(t, e, n).matched)
        );
      }
      function zv(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      const Ws = !1;
      class qs {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class Gv {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Zo(e) {
        return Fo(new qs(e));
      }
      function Wv(e) {
        return Fo(new Gv(e));
      }
      class lR {
        constructor(t, n, r, o, i) {
          (this.injector = t),
            (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = zs(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new H(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, n, $)
            .pipe(
              G((i) =>
                this.createUrlTree(
                  Ls(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              mn((i) => {
                if (i instanceof Gv)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof qs ? this.noMatchError(i) : i;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, $)
            .pipe(
              G((o) => this.createUrlTree(Ls(o), t.queryParams, t.fragment))
            )
            .pipe(
              mn((o) => {
                throw o instanceof qs ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(t) {
          return new w(4002, Ws);
        }
        createUrlTree(t, n, r) {
          const o = yl(t);
          return new vn(o, n, r);
        }
        expandSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(G((i) => new H([], i)))
            : this.expandSegment(t, r, n, r.segments, o, !0);
        }
        expandChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return we(o).pipe(
            jn((i) => {
              const s = r.children[i],
                a = $v(n, i);
              return this.expandSegmentGroup(t, a, s, i).pipe(
                G((u) => ({ segment: u, outlet: i }))
              );
            }),
            sv((i, s) => ((i[s.outlet] = s.segment), i), {}),
            av()
          );
        }
        expandSegment(t, n, r, o, i, s) {
          return we(r).pipe(
            jn((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, o, i, s).pipe(
                mn((c) => {
                  if (c instanceof qs) return M(null);
                  throw c;
                })
              )
            ),
            gn((a) => !!a),
            mn((a, u) => {
              if (Ol(a)) return zv(n, o, i) ? M(new H([], {})) : Zo(n);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return Hv(o, n, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
              : Zo(n)
            : Zo(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? Wv(i)
            : this.lineralizeSegments(r, i).pipe(
                Se((s) => {
                  const a = new H(s, {});
                  return this.expandSegment(t, a, n, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: u,
            remainingSegments: c,
            positionalParamSegments: l,
          } = Fl(n, o, i);
          if (!a) return Zo(n);
          const d = this.applyRedirectCommands(u, o.redirectTo, l);
          return o.redirectTo.startsWith("/")
            ? Wv(d)
            : this.lineralizeSegments(o, d).pipe(
                Se((f) => this.expandSegment(t, n, r, f.concat(c), s, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, o, i) {
          return "**" === r.path
            ? ((t = jv(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? M({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(
                    G(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new H(o, {})
                      )
                    )
                  )
                : M(new H(o, {})))
            : Bv(n, r, o, t).pipe(
                kt(
                  ({ matched: s, consumedSegments: a, remainingSegments: u }) =>
                    s
                      ? this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                          Se((l) => {
                            const d = l.injector ?? t,
                              f = l.routes,
                              { segmentGroup: p, slicedSegments: h } = zs(
                                n,
                                a,
                                u,
                                f
                              ),
                              g = new H(p.segments, p.children);
                            if (0 === h.length && g.hasChildren())
                              return this.expandChildren(d, f, g).pipe(
                                G((m) => new H(a, m))
                              );
                            if (0 === f.length && 0 === h.length)
                              return M(new H(a, {}));
                            const y = ft(r) === i;
                            return this.expandSegment(
                              d,
                              g,
                              f,
                              h,
                              y ? $ : i,
                              !0
                            ).pipe(
                              G((_) => new H(a.concat(_.segments), _.children))
                            );
                          })
                        )
                      : Zo(n)
                )
              );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? M({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? M({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function tR(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? M(!0)
                    : M(
                        o.map((s) => {
                          const a = Fr(s, e);
                          return yn(
                            (function UA(e) {
                              return e && Yo(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(kr(), Uv());
                })(t, n, r).pipe(
                  Se((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          Fe((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          })
                        )
                      : (function uR(e) {
                          return Fo(Fv(Ws, 3));
                        })()
                  )
                )
            : M({ routes: [], injector: t });
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return M(r);
            if (o.numberOfChildren > 1 || !o.children[$])
              return t.redirectTo, Fo(new w(4e3, Ws));
            o = o.children[$];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new vn(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Te(t, (o, i) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = n[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            Te(n.children, (a, u) => {
              s[u] = this.createSegmentGroup(t, a, r, o);
            }),
            new H(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new w(4001, Ws);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      class fR {}
      class gR {
        constructor(t, n, r, o, i, s, a) {
          (this.injector = t),
            (this.rootComponentType = n),
            (this.config = r),
            (this.urlTree = o),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a);
        }
        recognize() {
          const t = zs(
            this.urlTree.root,
            [],
            [],
            this.config.filter((n) => void 0 === n.redirectTo)
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            $
          ).pipe(
            G((n) => {
              if (null === n) return null;
              const r = new Vs(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  $,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                o = new rn(r, n),
                i = new Pv(this.url, o);
              return this.inheritParamsAndData(i._root), i;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = Rv(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o);
        }
        processChildren(t, n, r) {
          return we(Object.keys(r.children)).pipe(
            jn((o) => {
              const i = r.children[o],
                s = $v(n, o);
              return this.processSegmentGroup(t, s, i, o);
            }),
            sv((o, i) => (o && i ? (o.push(...i), o) : null)),
            (function NT(e, t = !1) {
              return be((n, r) => {
                let o = 0;
                n.subscribe(
                  Ee(r, (i) => {
                    const s = e(i, o++);
                    (s || t) && r.next(i), !s && r.complete();
                  })
                );
              });
            })((o) => null !== o),
            As(null),
            av(),
            G((o) => {
              if (null === o) return null;
              const i = Yv(o);
              return (
                (function mR(e) {
                  e.sort((t, n) =>
                    t.value.outlet === $
                      ? -1
                      : n.value.outlet === $
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(i),
                i
              );
            })
          );
        }
        processSegment(t, n, r, o, i) {
          return we(n).pipe(
            jn((s) =>
              this.processSegmentAgainstRoute(s._injector ?? t, s, r, o, i)
            ),
            gn((s) => !!s),
            mn((s) => {
              if (Ol(s)) return zv(r, o, i) ? M([]) : M(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i) {
          if (n.redirectTo || !Hv(n, r, o, i)) return M(null);
          let s;
          if ("**" === n.path) {
            const a = o.length > 0 ? lv(o).parameters : {},
              u = Qv(r) + o.length;
            s = M({
              snapshot: new Vs(
                o,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                Kv(n),
                ft(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                Zv(r),
                u,
                Xv(n)
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = Bv(r, n, o, t).pipe(
              G(
                ({
                  matched: a,
                  consumedSegments: u,
                  remainingSegments: c,
                  parameters: l,
                }) => {
                  if (!a) return null;
                  const d = Qv(r) + u.length;
                  return {
                    snapshot: new Vs(
                      u,
                      l,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      Kv(n),
                      ft(n),
                      n.component ?? n._loadedComponent ?? null,
                      n,
                      Zv(r),
                      d,
                      Xv(n)
                    ),
                    consumedSegments: u,
                    remainingSegments: c,
                  };
                }
              )
            );
          return s.pipe(
            kt((a) => {
              if (null === a) return M(null);
              const {
                snapshot: u,
                consumedSegments: c,
                remainingSegments: l,
              } = a;
              t = n._injector ?? t;
              const d = n._loadedInjector ?? t,
                f = (function yR(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                    ? e._loadedRoutes
                    : [];
                })(n),
                { segmentGroup: p, slicedSegments: h } = zs(
                  r,
                  c,
                  l,
                  f.filter((y) => void 0 === y.redirectTo)
                );
              if (0 === h.length && p.hasChildren())
                return this.processChildren(d, f, p).pipe(
                  G((y) => (null === y ? null : [new rn(u, y)]))
                );
              if (0 === f.length && 0 === h.length) return M([new rn(u, [])]);
              const g = ft(n) === i;
              return this.processSegment(d, f, p, h, g ? $ : i).pipe(
                G((y) => (null === y ? null : [new rn(u, y)]))
              );
            })
          );
        }
      }
      function vR(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function Yv(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!vR(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = Yv(r.children);
          t.push(new rn(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function Zv(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function Qv(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function Kv(e) {
        return e.data || {};
      }
      function Xv(e) {
        return e.resolve || {};
      }
      function Jv(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function kl(e) {
        return kt((t) => {
          const n = e(t);
          return n ? we(n).pipe(G(() => t)) : M(t);
        });
      }
      const Lr = new P("ROUTES");
      let Ll = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = W(Fm));
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return M(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = yn(n.loadComponent()).pipe(
                G(t0),
                Fe((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                hl(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              o = new ov(r, () => new $t()).pipe(fl());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return M({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                G((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let u,
                    c,
                    l = !1;
                  Array.isArray(a)
                    ? (c = a)
                    : ((u = a.create(n).injector),
                      (c = cv(u.get(Lr, [], A.Self | A.Optional))));
                  return { routes: c.map(Pl), injector: u };
                }),
                hl(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new ov(i, () => new $t()).pipe(fl());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(n) {
            return yn(n()).pipe(
              G(t0),
              Se((r) =>
                r instanceof zg || Array.isArray(r)
                  ? M(r)
                  : we(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function t0(e) {
        return (function SR(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let Zs = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new $t()),
              (this.configLoader = W(Ll)),
              (this.environmentInjector = W(Yt)),
              (this.urlSerializer = W(jo)),
              (this.rootContexts = W(zo)),
              (this.navigationId = 0),
              (this.afterPreactivation = () => M(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new pA(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new fA(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: r });
          }
          setupNavigations(n) {
            return (
              (this.transitions = new bt({
                id: 0,
                targetPageId: 0,
                currentUrlTree: n.currentUrlTree,
                currentRawUrl: n.currentUrlTree,
                extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
                urlAfterRedirects: n.urlHandlingStrategy.extract(
                  n.currentUrlTree
                ),
                rawUrl: n.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Bo,
                restoredState: null,
                currentSnapshot: n.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: n.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                hn((r) => 0 !== r.id),
                G((r) => ({
                  ...r,
                  extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl),
                })),
                kt((r) => {
                  let o = !1,
                    i = !1;
                  return M(r).pipe(
                    Fe((s) => {
                      this.currentNavigation = {
                        id: s.id,
                        initialUrl: s.rawUrl,
                        extractedUrl: s.extractedUrl,
                        trigger: s.source,
                        extras: s.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    kt((s) => {
                      const a = n.browserUrlTree.toString(),
                        u =
                          !n.navigated ||
                          s.extractedUrl.toString() !== a ||
                          a !== n.currentUrlTree.toString();
                      if (
                        !u &&
                        "reload" !==
                          (s.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const l = "";
                        return (
                          this.events.next(
                            new $s(s.id, n.serializeUrl(r.rawUrl), l, 0)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          Et
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                        return (
                          n0(s.source) && (n.browserUrlTree = s.extractedUrl),
                          M(s).pipe(
                            kt((l) => {
                              const d = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new Cl(
                                    l.id,
                                    this.urlSerializer.serialize(
                                      l.extractedUrl
                                    ),
                                    l.source,
                                    l.restoredState
                                  )
                                ),
                                d !== this.transitions?.getValue()
                                  ? Et
                                  : Promise.resolve(l)
                              );
                            }),
                            (function dR(e, t, n, r) {
                              return kt((o) =>
                                (function cR(e, t, n, r, o) {
                                  return new lR(e, t, n, r, o).apply();
                                })(e, t, n, o.extractedUrl, r).pipe(
                                  G((i) => ({ ...o, urlAfterRedirects: i }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.urlSerializer,
                              n.config
                            ),
                            Fe((l) => {
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: l.urlAfterRedirects,
                              }),
                                (r.urlAfterRedirects = l.urlAfterRedirects);
                            }),
                            (function wR(e, t, n, r, o) {
                              return Se((i) =>
                                (function hR(
                                  e,
                                  t,
                                  n,
                                  r,
                                  o,
                                  i,
                                  s = "emptyOnly"
                                ) {
                                  return new gR(e, t, n, r, o, s, i)
                                    .recognize()
                                    .pipe(
                                      kt((a) =>
                                        null === a
                                          ? (function pR(e) {
                                              return new De((t) => t.error(e));
                                            })(new fR())
                                          : M(a)
                                      )
                                    );
                                })(
                                  e,
                                  t,
                                  n,
                                  i.urlAfterRedirects,
                                  r.serialize(i.urlAfterRedirects),
                                  r,
                                  o
                                ).pipe(G((s) => ({ ...i, targetSnapshot: s })))
                              );
                            })(
                              this.environmentInjector,
                              this.rootComponentType,
                              n.config,
                              this.urlSerializer,
                              n.paramsInheritanceStrategy
                            ),
                            Fe((l) => {
                              if (
                                ((r.targetSnapshot = l.targetSnapshot),
                                "eager" === n.urlUpdateStrategy)
                              ) {
                                if (!l.extras.skipLocationChange) {
                                  const f = n.urlHandlingStrategy.merge(
                                    l.urlAfterRedirects,
                                    l.rawUrl
                                  );
                                  n.setBrowserUrl(f, l);
                                }
                                n.browserUrlTree = l.urlAfterRedirects;
                              }
                              const d = new aA(
                                l.id,
                                this.urlSerializer.serialize(l.extractedUrl),
                                this.urlSerializer.serialize(
                                  l.urlAfterRedirects
                                ),
                                l.targetSnapshot
                              );
                              this.events.next(d);
                            })
                          )
                        );
                      if (
                        u &&
                        n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)
                      ) {
                        const {
                            id: l,
                            extractedUrl: d,
                            source: f,
                            restoredState: p,
                            extras: h,
                          } = s,
                          g = new Cl(l, this.urlSerializer.serialize(d), f, p);
                        this.events.next(g);
                        const y = Av(d, this.rootComponentType).snapshot;
                        return M(
                          (r = {
                            ...s,
                            targetSnapshot: y,
                            urlAfterRedirects: d,
                            extras: {
                              ...h,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          })
                        );
                      }
                      {
                        const l = "";
                        return (
                          this.events.next(
                            new $s(s.id, n.serializeUrl(r.extractedUrl), l, 1)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          Et
                        );
                      }
                    }),
                    Fe((s) => {
                      const a = new uA(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot
                      );
                      this.events.next(a);
                    }),
                    G(
                      (s) =>
                        (r = {
                          ...s,
                          guards: kA(
                            s.targetSnapshot,
                            s.currentSnapshot,
                            this.rootContexts
                          ),
                        })
                    ),
                    (function qA(e, t) {
                      return Se((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = n;
                        return 0 === s.length && 0 === i.length
                          ? M({ ...n, guardsResult: !0 })
                          : (function YA(e, t, n, r) {
                              return we(e).pipe(
                                Se((o) =>
                                  (function eR(e, t, n, r, o) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? M(
                                          i.map((a) => {
                                            const u = Go(t) ?? o,
                                              c = Fr(a, u);
                                            return yn(
                                              (function zA(e) {
                                                return e && Yo(e.canDeactivate);
                                              })(c)
                                                ? c.canDeactivate(e, t, n, r)
                                                : u.runInContext(() =>
                                                    c(e, t, n, r)
                                                  )
                                            ).pipe(gn());
                                          })
                                        ).pipe(kr())
                                      : M(!0);
                                  })(o.component, o.route, n, t, r)
                                ),
                                gn((o) => !0 !== o, !0)
                              );
                            })(s, r, o, e).pipe(
                              Se((a) =>
                                a &&
                                (function VA(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function ZA(e, t, n, r) {
                                      return we(t).pipe(
                                        jn((o) =>
                                          dl(
                                            (function KA(e, t) {
                                              return (
                                                null !== e && t && t(new hA(e)),
                                                M(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function QA(e, t) {
                                              return (
                                                null !== e && t && t(new mA(e)),
                                                M(!0)
                                              );
                                            })(o.route, r),
                                            (function JA(e, t, n) {
                                              const r = t[t.length - 1],
                                                i = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function LA(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    rv(() =>
                                                      M(
                                                        s.guards.map((u) => {
                                                          const c =
                                                              Go(s.node) ?? n,
                                                            l = Fr(u, c);
                                                          return yn(
                                                            (function HA(e) {
                                                              return (
                                                                e &&
                                                                Yo(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(l)
                                                              ? l.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : c.runInContext(
                                                                  () => l(r, e)
                                                                )
                                                          ).pipe(gn());
                                                        })
                                                      ).pipe(kr())
                                                    )
                                                  );
                                              return M(i).pipe(kr());
                                            })(e, o.path, n),
                                            (function XA(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return M(!0);
                                              const o = r.map((i) =>
                                                rv(() => {
                                                  const s = Go(t) ?? n,
                                                    a = Fr(i, s);
                                                  return yn(
                                                    (function BA(e) {
                                                      return (
                                                        e && Yo(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe(gn());
                                                })
                                              );
                                              return M(o).pipe(kr());
                                            })(e, o.route, n)
                                          )
                                        ),
                                        gn((o) => !0 !== o, !0)
                                      );
                                    })(r, i, e, t)
                                  : M(a)
                              ),
                              G((a) => ({ ...n, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (s) => this.events.next(s)),
                    Fe((s) => {
                      if (
                        ((r.guardsResult = s.guardsResult), Vn(s.guardsResult))
                      )
                        throw Nv(0, s.guardsResult);
                      const a = new cA(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot,
                        !!s.guardsResult
                      );
                      this.events.next(a);
                    }),
                    hn(
                      (s) =>
                        !!s.guardsResult ||
                        (n.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1)
                    ),
                    kl((s) => {
                      if (s.guards.canActivateChecks.length)
                        return M(s).pipe(
                          Fe((a) => {
                            const u = new lA(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(u);
                          }),
                          kt((a) => {
                            let u = !1;
                            return M(a).pipe(
                              (function CR(e, t) {
                                return Se((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = n;
                                  if (!o.length) return M(n);
                                  let i = 0;
                                  return we(o).pipe(
                                    jn((s) =>
                                      (function _R(e, t, n, r) {
                                        const o = e.routeConfig,
                                          i = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !Jv(o) &&
                                            (i[ko] = o.title),
                                          (function xR(e, t, n, r) {
                                            const o = (function bR(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return M({});
                                            const i = {};
                                            return we(o).pipe(
                                              Se((s) =>
                                                (function ER(e, t, n, r) {
                                                  const o = Go(t) ?? r,
                                                    i = Fr(e, o);
                                                  return yn(
                                                    i.resolve
                                                      ? i.resolve(t, n)
                                                      : o.runInContext(() =>
                                                          i(t, n)
                                                        )
                                                  );
                                                })(e[s], t, n, r).pipe(
                                                  gn(),
                                                  Fe((a) => {
                                                    i[s] = a;
                                                  })
                                                )
                                              ),
                                              pl(1),
                                              (function FT(e) {
                                                return G(() => e);
                                              })(i),
                                              mn((s) => (Ol(s) ? Et : Fo(s)))
                                            );
                                          })(i, e, t, r).pipe(
                                            G(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = Rv(e, n).resolve),
                                                o &&
                                                  Jv(o) &&
                                                  (e.data[ko] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, r, e, t)
                                    ),
                                    Fe(() => i++),
                                    pl(1),
                                    Se((s) => (i === o.length ? M(n) : Et))
                                  );
                                });
                              })(
                                n.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              Fe({
                                next: () => (u = !0),
                                complete: () => {
                                  u ||
                                    (n.restoreHistory(a),
                                    this.cancelNavigationTransition(a, "", 2));
                                },
                              })
                            );
                          }),
                          Fe((a) => {
                            const u = new dA(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(u);
                          })
                        );
                    }),
                    kl((s) => {
                      const a = (u) => {
                        const c = [];
                        u.routeConfig?.loadComponent &&
                          !u.routeConfig._loadedComponent &&
                          c.push(
                            this.configLoader.loadComponent(u.routeConfig).pipe(
                              Fe((l) => {
                                u.component = l;
                              }),
                              G(() => {})
                            )
                          );
                        for (const l of u.children) c.push(...a(l));
                        return c;
                      };
                      return tv(a(s.targetSnapshot.root)).pipe(As(), Mr(1));
                    }),
                    kl(() => this.afterPreactivation()),
                    G((s) => {
                      const a = (function EA(e, t, n) {
                        const r = Ho(e, t._root, n ? n._root : void 0);
                        return new Tv(r, t);
                      })(
                        n.routeReuseStrategy,
                        s.targetSnapshot,
                        s.currentRouterState
                      );
                      return (r = { ...s, targetRouterState: a });
                    }),
                    Fe((s) => {
                      (n.currentUrlTree = s.urlAfterRedirects),
                        (n.rawUrlTree = n.urlHandlingStrategy.merge(
                          s.urlAfterRedirects,
                          s.rawUrl
                        )),
                        (n.routerState = s.targetRouterState),
                        "deferred" === n.urlUpdateStrategy &&
                          (s.extras.skipLocationChange ||
                            n.setBrowserUrl(n.rawUrlTree, s),
                          (n.browserUrlTree = s.urlAfterRedirects));
                    }),
                    ((e, t, n) =>
                      G(
                        (r) => (
                          new FA(
                            t,
                            r.targetRouterState,
                            r.currentRouterState,
                            n
                          ).activate(e),
                          r
                        )
                      ))(this.rootContexts, n.routeReuseStrategy, (s) =>
                      this.events.next(s)
                    ),
                    Mr(1),
                    Fe({
                      next: (s) => {
                        (o = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (n.navigated = !0),
                          this.events.next(
                            new Un(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(n.currentUrlTree)
                            )
                          ),
                          n.titleStrategy?.updateTitle(
                            s.targetRouterState.snapshot
                          ),
                          s.resolve(!0);
                      },
                      complete: () => {
                        o = !0;
                      },
                    }),
                    hl(() => {
                      o || i || this.cancelNavigationTransition(r, "", 1),
                        this.currentNavigation?.id === r.id &&
                          (this.currentNavigation = null);
                    }),
                    mn((s) => {
                      if (((i = !0), Lv(s))) {
                        kv(s) || ((n.navigated = !0), n.restoreHistory(r, !0));
                        const a = new js(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s.message,
                          s.cancellationCode
                        );
                        if ((this.events.next(a), kv(s))) {
                          const u = n.urlHandlingStrategy.merge(
                              s.url,
                              n.rawUrlTree
                            ),
                            c = {
                              skipLocationChange: r.extras.skipLocationChange,
                              replaceUrl:
                                "eager" === n.urlUpdateStrategy || n0(r.source),
                            };
                          n.scheduleNavigation(u, Bo, null, c, {
                            resolve: r.resolve,
                            reject: r.reject,
                            promise: r.promise,
                          });
                        } else r.resolve(!1);
                      } else {
                        n.restoreHistory(r, !0);
                        const a = new _l(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s,
                          r.targetSnapshot ?? void 0
                        );
                        this.events.next(a);
                        try {
                          r.resolve(n.errorHandler(s));
                        } catch (u) {
                          r.reject(u);
                        }
                      }
                      return Et;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(n, r, o) {
            const i = new js(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              r,
              o
            );
            this.events.next(i), n.resolve(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function n0(e) {
        return e !== Bo;
      }
      let r0 = (() => {
          class e {
            buildTitle(n) {
              let r,
                o = n.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === $));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[ko];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = F({
              token: e,
              factory: function () {
                return W(IR);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        IR = (() => {
          class e extends r0 {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(R(Xy));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        MR = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = F({
              token: e,
              factory: function () {
                return W(AR);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class TR {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let AR = (() => {
        class e extends TR {}
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (
                t ||
                (t = (function df(e) {
                  return Ut(() => {
                    const t = e.prototype.constructor,
                      n = t[Ht] || $a(t),
                      r = Object.prototype;
                    let o = Object.getPrototypeOf(e.prototype).constructor;
                    for (; o && o !== r; ) {
                      const i = o[Ht] || $a(o);
                      if (i && i !== n) return i;
                      o = Object.getPrototypeOf(o);
                    }
                    return (i) => new i();
                  });
                })(e))
              )(r || e);
            };
          })()),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Qs = new P("", { providedIn: "root", factory: () => ({}) });
      let PR = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = F({
              token: e,
              factory: function () {
                return W(OR);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        OR = (() => {
          class e {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, r) {
              return n;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function NR(e) {
        throw e;
      }
      function FR(e, t, n) {
        return t.parse("/");
      }
      const kR = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        LR = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let nt = (() => {
          class e {
            get navigationId() {
              return this.navigationTransitions.navigationId;
            }
            get browserPageId() {
              if ("computed" === this.canceledNavigationResolution)
                return this.location.getState()?.ɵrouterPageId;
            }
            get events() {
              return this.navigationTransitions.events;
            }
            constructor() {
              (this.disposed = !1),
                (this.currentPageId = 0),
                (this.console = W(oS)),
                (this.isNgZoneEnabled = !1),
                (this.options = W(Qs, { optional: !0 }) || {}),
                (this.errorHandler = this.options.errorHandler || NR),
                (this.malformedUriErrorHandler =
                  this.options.malformedUriErrorHandler || FR),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.urlHandlingStrategy = W(PR)),
                (this.routeReuseStrategy = W(MR)),
                (this.urlCreationStrategy = W(_A)),
                (this.titleStrategy = W(r0)),
                (this.onSameUrlNavigation =
                  this.options.onSameUrlNavigation || "ignore"),
                (this.paramsInheritanceStrategy =
                  this.options.paramsInheritanceStrategy || "emptyOnly"),
                (this.urlUpdateStrategy =
                  this.options.urlUpdateStrategy || "deferred"),
                (this.canceledNavigationResolution =
                  this.options.canceledNavigationResolution || "replace"),
                (this.config = cv(W(Lr, { optional: !0 }) ?? [])),
                (this.navigationTransitions = W(Zs)),
                (this.urlSerializer = W(jo)),
                (this.location = W(Vc)),
                (this.isNgZoneEnabled =
                  W(fe) instanceof fe && fe.isInAngularZone()),
                this.resetConfig(this.config),
                (this.currentUrlTree = new vn()),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.routerState = Av(this.currentUrlTree, null)),
                this.navigationTransitions.setupNavigations(this).subscribe(
                  (n) => {
                    (this.lastSuccessfulId = n.id),
                      (this.currentPageId = this.browserPageId ?? 0);
                  },
                  (n) => {
                    this.console.warn(`Unhandled Navigation Error: ${n}`);
                  }
                );
            }
            resetRootComponentType(n) {
              (this.routerState.root.component = n),
                (this.navigationTransitions.rootComponentType = n);
            }
            initialNavigation() {
              if (
                (this.setUpLocationChangeListener(),
                !this.navigationTransitions.hasRequestedNavigation)
              ) {
                const n = this.location.getState();
                this.navigateToSyncWithBrowser(this.location.path(!0), Bo, n);
              }
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((n) => {
                  const r = "popstate" === n.type ? "popstate" : "hashchange";
                  "popstate" === r &&
                    setTimeout(() => {
                      this.navigateToSyncWithBrowser(n.url, r, n.state);
                    }, 0);
                }));
            }
            navigateToSyncWithBrowser(n, r, o) {
              const i = { replaceUrl: !0 },
                s = o?.navigationId ? o : null;
              if (o) {
                const u = { ...o };
                delete u.navigationId,
                  delete u.ɵrouterPageId,
                  0 !== Object.keys(u).length && (i.state = u);
              }
              const a = this.parseUrl(n);
              this.scheduleNavigation(a, r, s, i);
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.navigationTransitions.currentNavigation;
            }
            resetConfig(n) {
              (this.config = n.map(Pl)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.navigationTransitions.complete(),
                this.locationSubscription &&
                  (this.locationSubscription.unsubscribe(),
                  (this.locationSubscription = void 0)),
                (this.disposed = !0);
            }
            createUrlTree(n, r = {}) {
              const {
                  relativeTo: o,
                  queryParams: i,
                  fragment: s,
                  queryParamsHandling: a,
                  preserveFragment: u,
                } = r,
                c = u ? this.currentUrlTree.fragment : s;
              let l = null;
              switch (a) {
                case "merge":
                  l = { ...this.currentUrlTree.queryParams, ...i };
                  break;
                case "preserve":
                  l = this.currentUrlTree.queryParams;
                  break;
                default:
                  l = i || null;
              }
              return (
                null !== l && (l = this.removeEmptyProps(l)),
                this.urlCreationStrategy.createUrlTree(
                  o,
                  this.routerState,
                  this.currentUrlTree,
                  n,
                  l,
                  c ?? null
                )
              );
            }
            navigateByUrl(n, r = { skipLocationChange: !1 }) {
              const o = Vn(n) ? n : this.parseUrl(n),
                i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
              return this.scheduleNavigation(i, Bo, null, r);
            }
            navigate(n, r = { skipLocationChange: !1 }) {
              return (
                (function jR(e) {
                  for (let t = 0; t < e.length; t++) {
                    const n = e[t];
                    if (null == n) throw new w(4008, false);
                  }
                })(n),
                this.navigateByUrl(this.createUrlTree(n, r), r)
              );
            }
            serializeUrl(n) {
              return this.urlSerializer.serialize(n);
            }
            parseUrl(n) {
              let r;
              try {
                r = this.urlSerializer.parse(n);
              } catch (o) {
                r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
              }
              return r;
            }
            isActive(n, r) {
              let o;
              if (
                ((o = !0 === r ? { ...kR } : !1 === r ? { ...LR } : r), Vn(n))
              )
                return fv(this.currentUrlTree, n, o);
              const i = this.parseUrl(n);
              return fv(this.currentUrlTree, i, o);
            }
            removeEmptyProps(n) {
              return Object.keys(n).reduce((r, o) => {
                const i = n[o];
                return null != i && (r[o] = i), r;
              }, {});
            }
            scheduleNavigation(n, r, o, i, s) {
              if (this.disposed) return Promise.resolve(!1);
              let a, u, c, l;
              return (
                s
                  ? ((a = s.resolve), (u = s.reject), (c = s.promise))
                  : (c = new Promise((d, f) => {
                      (a = d), (u = f);
                    })),
                (l =
                  "computed" === this.canceledNavigationResolution
                    ? o && o.ɵrouterPageId
                      ? o.ɵrouterPageId
                      : (this.browserPageId ?? 0) + 1
                    : 0),
                this.navigationTransitions.handleNavigationRequest({
                  targetPageId: l,
                  source: r,
                  restoredState: o,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  rawUrl: n,
                  extras: i,
                  resolve: a,
                  reject: u,
                  promise: c,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                c.catch((d) => Promise.reject(d))
              );
            }
            setBrowserUrl(n, r) {
              const o = this.urlSerializer.serialize(n);
              if (
                this.location.isCurrentPathEqualTo(o) ||
                r.extras.replaceUrl
              ) {
                const s = {
                  ...r.extras.state,
                  ...this.generateNgRouterState(r.id, this.browserPageId),
                };
                this.location.replaceState(o, "", s);
              } else {
                const i = {
                  ...r.extras.state,
                  ...this.generateNgRouterState(r.id, r.targetPageId),
                };
                this.location.go(o, "", i);
              }
            }
            restoreHistory(n, r = !1) {
              if ("computed" === this.canceledNavigationResolution) {
                const i =
                  this.currentPageId -
                  (this.browserPageId ?? this.currentPageId);
                0 !== i
                  ? this.location.historyGo(i)
                  : this.currentUrlTree ===
                      this.getCurrentNavigation()?.finalUrl &&
                    0 === i &&
                    (this.resetState(n),
                    (this.browserUrlTree = n.currentUrlTree),
                    this.resetUrlToCurrentUrlTree());
              } else
                "replace" === this.canceledNavigationResolution &&
                  (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
            }
            resetState(n) {
              (this.routerState = n.currentRouterState),
                (this.currentUrlTree = n.currentUrlTree),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  n.rawUrl
                ));
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                this.generateNgRouterState(
                  this.lastSuccessfulId,
                  this.currentPageId
                )
              );
            }
            generateNgRouterState(n, r) {
              return "computed" === this.canceledNavigationResolution
                ? { navigationId: n, ɵrouterPageId: r }
                : { navigationId: n };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        Ks = (() => {
          class e {
            constructor(n, r, o, i, s, a) {
              (this.router = n),
                (this.route = r),
                (this.tabIndexAttribute = o),
                (this.renderer = i),
                (this.el = s),
                (this.locationStrategy = a),
                (this._preserveFragment = !1),
                (this._skipLocationChange = !1),
                (this._replaceUrl = !1),
                (this.href = null),
                (this.commands = null),
                (this.onChanges = new $t());
              const u = s.nativeElement.tagName?.toLowerCase();
              (this.isAnchorElement = "a" === u || "area" === u),
                this.isAnchorElement
                  ? (this.subscription = n.events.subscribe((c) => {
                      c instanceof Un && this.updateHref();
                    }))
                  : this.setTabIndexIfNotOnNativeEl("0");
            }
            set preserveFragment(n) {
              this._preserveFragment = kc(n);
            }
            get preserveFragment() {
              return this._preserveFragment;
            }
            set skipLocationChange(n) {
              this._skipLocationChange = kc(n);
            }
            get skipLocationChange() {
              return this._skipLocationChange;
            }
            set replaceUrl(n) {
              this._replaceUrl = kc(n);
            }
            get replaceUrl() {
              return this._replaceUrl;
            }
            setTabIndexIfNotOnNativeEl(n) {
              null != this.tabIndexAttribute ||
                this.isAnchorElement ||
                this.applyAttributeValue("tabindex", n);
            }
            ngOnChanges(n) {
              this.isAnchorElement && this.updateHref(),
                this.onChanges.next(this);
            }
            set routerLink(n) {
              null != n
                ? ((this.commands = Array.isArray(n) ? n : [n]),
                  this.setTabIndexIfNotOnNativeEl("0"))
                : ((this.commands = null),
                  this.setTabIndexIfNotOnNativeEl(null));
            }
            onClick(n, r, o, i, s) {
              return (
                !!(
                  null === this.urlTree ||
                  (this.isAnchorElement &&
                    (0 !== n ||
                      r ||
                      o ||
                      i ||
                      s ||
                      ("string" == typeof this.target &&
                        "_self" != this.target)))
                ) ||
                (this.router.navigateByUrl(this.urlTree, {
                  skipLocationChange: this.skipLocationChange,
                  replaceUrl: this.replaceUrl,
                  state: this.state,
                }),
                !this.isAnchorElement)
              );
            }
            ngOnDestroy() {
              this.subscription?.unsubscribe();
            }
            updateHref() {
              this.href =
                null !== this.urlTree && this.locationStrategy
                  ? this.locationStrategy?.prepareExternalUrl(
                      this.router.serializeUrl(this.urlTree)
                    )
                  : null;
              const n =
                null === this.href
                  ? null
                  : (function dp(e, t, n) {
                      return (function QC(e, t) {
                        return ("src" === t &&
                          ("embed" === e ||
                            "frame" === e ||
                            "iframe" === e ||
                            "media" === e ||
                            "script" === e)) ||
                          ("href" === t && ("base" === e || "link" === e))
                          ? cp
                          : up;
                      })(
                        t,
                        n
                      )(e);
                    })(
                      this.href,
                      this.el.nativeElement.tagName.toLowerCase(),
                      "href"
                    );
              this.applyAttributeValue("href", n);
            }
            applyAttributeValue(n, r) {
              const o = this.renderer,
                i = this.el.nativeElement;
              null !== r ? o.setAttribute(i, n, r) : o.removeAttribute(i, n);
            }
            get urlTree() {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo:
                      void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(
                O(nt),
                O(Nr),
                (function bi(e) {
                  return (function _w(e, t) {
                    if ("class" === t) return e.classes;
                    if ("style" === t) return e.styles;
                    const n = e.attrs;
                    if (n) {
                      const r = n.length;
                      let o = 0;
                      for (; o < r; ) {
                        const i = n[o];
                        if (Qd(i)) break;
                        if (0 === i) o += 2;
                        else if ("number" == typeof i)
                          for (o++; o < r && "string" == typeof n[o]; ) o++;
                        else {
                          if (i === t) return n[o + 1];
                          o += 2;
                        }
                      }
                    }
                    return null;
                  })(Me(), e);
                })("tabindex"),
                O(ji),
                O(ln),
                O(Ln)
              );
            }),
            (e.ɵdir = ke({
              type: e,
              selectors: [["", "routerLink", ""]],
              hostVars: 1,
              hostBindings: function (n, r) {
                1 & n &&
                  Yu("click", function (i) {
                    return r.onClick(
                      i.button,
                      i.ctrlKey,
                      i.shiftKey,
                      i.altKey,
                      i.metaKey
                    );
                  }),
                  2 & n && zu("target", r.target);
              },
              inputs: {
                target: "target",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                state: "state",
                relativeTo: "relativeTo",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                routerLink: "routerLink",
              },
              standalone: !0,
              features: [Sn],
            })),
            e
          );
        })();
      class o0 {}
      let UR = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                hn((n) => n instanceof Un),
                jn(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = rs(i.providers, n, `Route: ${i.path}`));
              const s = i._injector ?? n,
                a = i._loadedInjector ?? s;
              ((i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
                (i.loadComponent && !i._loadedComponent)) &&
                o.push(this.preloadConfig(s, i)),
                (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return we(o).pipe(Bn());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : M(null);
              const i = o.pipe(
                Se((s) =>
                  null === s
                    ? M(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? we([i, this.loader.loadComponent(r)]).pipe(Bn())
                : i;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(nt), R(Fm), R(Yt), R(o0), R(Ll));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const $l = new P("");
      let s0 = (() => {
        class e {
          constructor(n, r, o, i, s = {}) {
            (this.urlSerializer = n),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = i),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof Cl
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof Un &&
                  ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof Iv &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new Iv(
                      n,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            !(function Bp() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      var rt = (() => (
        ((rt = rt || {})[(rt.COMPLETE = 0)] = "COMPLETE"),
        (rt[(rt.FAILED = 1)] = "FAILED"),
        (rt[(rt.REDIRECTING = 2)] = "REDIRECTING"),
        rt
      ))();
      const jr = !1;
      function Dn(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      const Vl = new P("", { providedIn: "root", factory: () => !1 });
      function u0() {
        const e = W(Qt);
        return (t) => {
          const n = e.get(ls);
          if (t !== n.components[0]) return;
          const r = e.get(nt),
            o = e.get(c0);
          1 === e.get(Ul) && r.initialNavigation(),
            e.get(l0, null, A.Optional)?.setUpPreloading(),
            e.get($l, null, A.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.closed || (o.next(), o.complete(), o.unsubscribe());
        };
      }
      const c0 = new P(jr ? "bootstrap done indicator" : "", {
          factory: () => new $t(),
        }),
        Ul = new P(jr ? "initial navigation" : "", {
          providedIn: "root",
          factory: () => 1,
        });
      function WR() {
        let e = [];
        return (
          (e = jr
            ? [
                {
                  provide: Fi,
                  multi: !0,
                  useFactory: () => {
                    const t = W(nt);
                    return () =>
                      t.events.subscribe((n) => {
                        console.group?.(`Router Event: ${n.constructor.name}`),
                          console.log(
                            (function vA(e) {
                              if (!("type" in e))
                                return `Unknown Router Event: ${e.constructor.name}`;
                              switch (e.type) {
                                case 14:
                                  return `ActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 13:
                                  return `ActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 12:
                                  return `ChildActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 11:
                                  return `ChildActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 8:
                                  return `GuardsCheckEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state}, shouldActivate: ${e.shouldActivate})`;
                                case 7:
                                  return `GuardsCheckStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 2:
                                  return `NavigationCancel(id: ${e.id}, url: '${e.url}')`;
                                case 16:
                                  return `NavigationSkipped(id: ${e.id}, url: '${e.url}')`;
                                case 1:
                                  return `NavigationEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}')`;
                                case 3:
                                  return `NavigationError(id: ${e.id}, url: '${e.url}', error: ${e.error})`;
                                case 0:
                                  return `NavigationStart(id: ${e.id}, url: '${e.url}')`;
                                case 6:
                                  return `ResolveEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 5:
                                  return `ResolveStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 10:
                                  return `RouteConfigLoadEnd(path: ${e.route.path})`;
                                case 9:
                                  return `RouteConfigLoadStart(path: ${e.route.path})`;
                                case 4:
                                  return `RoutesRecognized(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 15:
                                  return `Scroll(anchor: '${
                                    e.anchor
                                  }', position: '${
                                    e.position
                                      ? `${e.position[0]}, ${e.position[1]}`
                                      : null
                                  }')`;
                              }
                            })(n)
                          ),
                          console.log(n),
                          console.groupEnd?.();
                      });
                  },
                },
              ]
            : []),
          Dn(1, e)
        );
      }
      const l0 = new P(jr ? "router preloader" : "");
      function qR(e) {
        return Dn(0, [
          { provide: l0, useExisting: UR },
          { provide: o0, useExisting: e },
        ]);
      }
      const Qo = !1,
        d0 = new P(
          Qo ? "router duplicate forRoot guard" : "ROUTER_FORROOT_GUARD"
        ),
        YR = [
          Vc,
          { provide: jo, useClass: gl },
          nt,
          zo,
          {
            provide: Nr,
            useFactory: function a0(e) {
              return e.routerState.root;
            },
            deps: [nt],
          },
          Ll,
          Qo ? { provide: Vl, useValue: !0 } : [],
        ];
      function ZR() {
        return new Hm("Router", nt);
      }
      let f0 = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                YR,
                Qo && r?.enableTracing ? WR().ɵproviders : [],
                { provide: Lr, multi: !0, useValue: n },
                {
                  provide: d0,
                  useFactory: JR,
                  deps: [[nt, new ro(), new oo()]],
                },
                { provide: Qs, useValue: r || {} },
                r?.useHash
                  ? { provide: Ln, useClass: GS }
                  : { provide: Ln, useClass: fy },
                {
                  provide: $l,
                  useFactory: () => {
                    const e = W(pM),
                      t = W(fe),
                      n = W(Qs),
                      r = W(Zs),
                      o = W(jo);
                    return (
                      n.scrollOffset && e.setOffset(n.scrollOffset),
                      new s0(o, r, e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? qR(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: Hm, multi: !0, useFactory: ZR },
                r?.initialNavigation ? eP(r) : [],
                [
                  { provide: p0, useFactory: u0 },
                  { provide: Bm, multi: !0, useExisting: p0 },
                ],
              ],
            };
          }
          static forChild(n) {
            return {
              ngModule: e,
              providers: [{ provide: Lr, multi: !0, useValue: n }],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(R(d0, 8));
          }),
          (e.ɵmod = xn({ type: e })),
          (e.ɵinj = an({ imports: [Al] })),
          e
        );
      })();
      function JR(e) {
        if (Qo && e)
          throw new w(
            4007,
            "The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function eP(e) {
        return [
          "disabled" === e.initialNavigation
            ? Dn(3, [
                {
                  provide: as,
                  multi: !0,
                  useFactory: () => {
                    const t = W(nt);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Ul, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? Dn(2, [
                { provide: Ul, useValue: 0 },
                {
                  provide: as,
                  multi: !0,
                  deps: [Qt],
                  useFactory: (t) => {
                    const n = t.get(HS, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((r) => {
                            const o = t.get(nt),
                              i = t.get(c0);
                            (function BR(e, t) {
                              e.events
                                .pipe(
                                  hn(
                                    (n) =>
                                      n instanceof Un ||
                                      n instanceof js ||
                                      n instanceof _l ||
                                      n instanceof $s
                                  ),
                                  G((n) =>
                                    n instanceof Un || n instanceof $s
                                      ? rt.COMPLETE
                                      : n instanceof js &&
                                        (0 === n.code || 1 === n.code)
                                      ? rt.REDIRECTING
                                      : rt.FAILED
                                  ),
                                  hn((n) => n !== rt.REDIRECTING),
                                  Mr(1)
                                )
                                .subscribe(() => {
                                  t();
                                });
                            })(o, () => {
                              r(!0);
                            }),
                              (t.get(Zs).afterPreactivation = () => (
                                r(!0), i.closed ? M(void 0) : i
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const p0 = new P(Qo ? "Router Initializer" : "");
      let h0 = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵcmp = Mt({
            type: e,
            selectors: [["app-home"]],
            decls: 22,
            vars: 0,
            consts: [
              [1, "top-container"],
              [1, "myname"],
              [1, "occupation"],
              [
                "data",
                lp`assets/land.svg`,
                "width",
                "300",
                "height",
                "300",
                1,
                "mountain",
              ],
              [1, "middle-container"],
              [1, "profile"],
              ["assets/neslihan-cropped.png", "alt", ""],
              [2, "padding-top", "20px", "padding-bottom", "20px"],
              [1, "text-about"],
              [1, "contact-me"],
              [2, "color", "#fff"],
              [1, "contact-message"],
              [
                "href",
                "mailto:gvnc.neslihan@icloud.com",
                1,
                "btn",
                "contactbutton",
                2,
                "color",
                "#fff",
                "margin-bottom",
                "2%",
                "width",
                "30%",
                "text-size",
                "1.4rem",
              ],
            ],
            template: function (r, o) {
              1 & r &&
                (S(0, "div", 0)(1, "h1", 1),
                Y(2, "Ben Neslihan Y\u0131lmaz"),
                b(),
                S(3, "p", 2),
                Y(4, "Grafik Tasar\u0131mc\u0131s\u0131 ve Animat\xf6r"),
                b(),
                ee(5, "object", 3),
                b(),
                S(6, "div", 4)(7, "div", 5),
                ee(8, "img", 6),
                S(9, "h2", 7),
                Y(10, "Hakk\u0131mda"),
                b(),
                S(11, "p", 8),
                Y(
                  12,
                  " Ben bir grafik tasar\u0131mc\u0131y\u0131m ve y\xfcksek kalitede logo, tasar\u0131m, marka kimli\u011fi olu\u015fturabiliyorum. Logo tasar\u0131m\u0131 ve marka \xe7al\u0131\u015fmalar\u0131n\u0131n yan\u0131 s\u0131ra, ayn\u0131 zamanda yetenekli bir ill\xfcstrat\xf6r ve \xe7izimciyim. Adobe Photoshop, Illustrator, In Design ve Coral Draw gibi grafik tasar\u0131m programlar\u0131 hakk\u0131nda da geni\u015f bilgiye sahibim ve etkili olarak kullanmaktay\u0131m. Bu ara\xe7lar y\xfcksek kaliteli tasar\u0131mlar\u0131 h\u0131zl\u0131 ve verimli bir \u015fekilde olu\u015fturmam\u0131 sa\u011fl\u0131yor. Grafik tasar\u0131m\u0131 benim icin sadece bir i\u015f de\u011fil ayn\u0131 zamanda bir tutku. Bu sayede, i\u015fletmelerin her t\xfcrl\xfc tasar\u0131m gereksinimlerini kaliteli hikaye anlat\u0131m\u0131 yoluyla kar\u015f\u0131layacag\u0131m\u0131 ve b\xfcy\xfcmelerine yard\u0131mc\u0131 olaca\u011f\u0131m\u0131 d\xfc\u015f\xfcn\xfcyorum. "
                ),
                b()()(),
                S(13, "div", 9)(14, "h2"),
                Y(15, "\u0130leti\u015fim"),
                b(),
                S(16, "h3", 10),
                Y(
                  17,
                  "\u015eu anda tam zamanl\u0131, yar\u0131 zamanl\u0131 \xe7al\u0131\u015fabilirim."
                ),
                b(),
                S(18, "p", 11),
                Y(
                  19,
                  " Asa\u011f\u0131daki ileti\u015fim bilgilerinden benimle temasa ge\xe7ebilirsiniz. "
                ),
                b(),
                S(20, "a", 12),
                Y(21, "MESAJ G\xd6NDER"),
                b()());
            },
            styles: [
              ".top-container[_ngcontent-%COMP%]{position:relative;background-color:#ffffff1a;margin:0;border:0px;font-family:Franklin Gothic Medium,Arial Narrow,Arial,sans-serif;color:#66bfbf}.middle-container[_ngcontent-%COMP%]{margin:80px auto;font-family:Franklin Gothic Medium,Arial Narrow,Arial,sans-serif}.bottom-container[_ngcontent-%COMP%]{color:#66bfbf;background-color:#ffffff1a;padding:1rem 0;display:block;text-align:center;align-items:center;font-family:Franklin Gothic Medium,Arial Narrow,Arial,sans-serif}.upper-cloud[_ngcontent-%COMP%]{position:relative;left:20%;width:200px;height:200px;margin-right:2%}.lower-cloud[_ngcontent-%COMP%]{position:absolute;width:200px;height:200px;bottom:30%;left:10%}.mountain[_ngcontent-%COMP%]{margin-top:5%;width:50%;height:50%}.myname[_ngcontent-%COMP%]{padding-top:5%;line-height:2;width:100%;margin:0 auto;font-size:2.5rem;color:#fff;text-align:center}.occupation[_ngcontent-%COMP%]{text-align:center;line-height:2;font-size:1.5rem;color:#fff;font-weight:400;width:100%}.profile[_ngcontent-%COMP%]{color:#66bfbf;text-align:center}.text-about[_ngcontent-%COMP%]{text-align:justify;width:61%;margin:auto auto 100px;color:#fff;line-height:1.6}.myline[_ngcontent-%COMP%]{border-style:none;border-top-style:dotted;width:5%;border-color:#fff;border-width:6px;margin:auto}.row[_ngcontent-%COMP%]{margin:50px auto;text-align:center}.skills[_ngcontent-%COMP%]{margin:70px auto;width:100%;background-color:#ffffff1a;color:#fff}.datascience[_ngcontent-%COMP%]{line-height:1.6;text-align:center;margin-left:15%}.datascienceimage[_ngcontent-%COMP%]{text-align:center}.machinelearning[_ngcontent-%COMP%]{line-height:1.6;margin-left:15%;text-align:center}.machinelearningimage[_ngcontent-%COMP%]{text-align:center}.deeplearning[_ngcontent-%COMP%]{line-height:1.6;text-align:center;margin-left:15%}.deeplearningimage[_ngcontent-%COMP%]{text-align:center;align-items:center;margin-left:8%}.software[_ngcontent-%COMP%]{line-height:1.6;margin-left:15%}.softwareimage[_ngcontent-%COMP%]{text-align:center}.contact-message[_ngcontent-%COMP%]{width:40%;margin:40px auto 20px;font-weight:300px;line-height:2;font-size:1.4rem;width:100%}",
            ],
          }));
        }
        return e;
      })();
      const nP = [
        { path: "", component: h0 },
        {
          path: "projects",
          component: (() => {
            class e {
              static #e = (this.ɵfac = function (r) {
                return new (r || e)();
              });
              static #t = (this.ɵcmp = Mt({
                type: e,
                selectors: [["app-project"]],
                decls: 121,
                vars: 0,
                consts: [
                  ["id", "mainCoantiner"],
                  [1, "margin-body"],
                  [1, "starsec"],
                  [1, "starthird"],
                  [1, "starfourth"],
                  [1, "starfifth"],
                  [1, "row"],
                  [1, "col-sm-12", "col-md-12"],
                  [1, "wpb_text_column", "wpb_content_element"],
                  [1, "wpb_wrapper"],
                  [1, "title-h1", "text-center"],
                  [1, "col-lg-6", "col-md-1", "pricing-column-wrapper"],
                  [1, "pricing-column", 2, "width", "100%", "height", "100%"],
                  [1, "pricing-price-row"],
                  [1, "pricing-price-wrapper"],
                  [1, "pricing_row_title"],
                  [1, "pricing-row-title"],
                  [
                    "assets/tasarim16.jpg",
                    "alt",
                    "",
                    1,
                    "img-responsive",
                    2,
                    "width",
                    "100%",
                    "height",
                    "600px",
                  ],
                  [
                    "assets/tasarim17.jpg",
                    "alt",
                    "",
                    1,
                    "img-responsive",
                    2,
                    "width",
                    "100%",
                    "height",
                    "600px",
                  ],
                  ["size", "2", 1, "myline", 2, "border-color", "#fff"],
                  [
                    "assets/tasarim2.jpg",
                    "alt",
                    "",
                    1,
                    "img-responsive",
                    2,
                    "width",
                    "100%",
                    "height",
                    "600px",
                  ],
                  [
                    "assets/tasarim9.jpg",
                    "alt",
                    "",
                    1,
                    "img-responsive",
                    2,
                    "width",
                    "100%",
                    "height",
                    "600px",
                  ],
                  [
                    "assets/tasarim10.jpg",
                    "alt",
                    "",
                    1,
                    "img-responsive",
                    2,
                    "width",
                    "100%",
                    "height",
                    "1000px",
                  ],
                  [
                    "assets/tasarim11.jpg",
                    "alt",
                    "",
                    1,
                    "img-responsive",
                    2,
                    "width",
                    "100%",
                    "height",
                    "1000px",
                  ],
                  [
                    "assets/tasarim12.jpg",
                    "alt",
                    "",
                    1,
                    "img-responsive",
                    2,
                    "width",
                    "100%",
                    "height",
                    "1000px",
                  ],
                  [
                    "assets/tasarim13.jpg",
                    "alt",
                    "",
                    1,
                    "img-responsive",
                    2,
                    "width",
                    "100%",
                    "height",
                    "1000px",
                  ],
                  [
                    "assets/tasarim18.jpg",
                    "alt",
                    "",
                    1,
                    "img-responsive",
                    2,
                    "width",
                    "100%",
                    "height",
                    "1000px",
                  ],
                  [
                    "assets/tasarim19.jpg",
                    "alt",
                    "",
                    1,
                    "img-responsive",
                    2,
                    "width",
                    "100%",
                    "height",
                    "1000px",
                  ],
                  [
                    "assets/tasarim1.jpg",
                    "alt",
                    "",
                    1,
                    "img-responsive",
                    2,
                    "width",
                    "100%",
                    "height",
                    "600px",
                  ],
                  [
                    "assets/tasarim3.jpg",
                    "alt",
                    "",
                    1,
                    "img-responsive",
                    2,
                    "width",
                    "100%",
                    "height",
                    "600px",
                  ],
                ],
                template: function (r, o) {
                  1 & r &&
                    (S(0, "div", 0)(1, "div", 1)(2, "div"),
                    ee(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "div", 5),
                    b(),
                    S(7, "div", 6)(8, "div", 7)(9, "div", 8)(10, "div", 9)(
                      11,
                      "div",
                      10
                    )(12, "span"),
                    Y(13, "Tasar\u0131mlar\u0131m"),
                    b()()()()()(),
                    S(14, "div", 6)(15, "div", 11)(16, "div", 12)(
                      17,
                      "div",
                      13
                    )(18, "div", 14)(19, "div", 15),
                    Y(20, "T-SHIRT LOGO"),
                    b()()(),
                    S(21, "div", 16),
                    ee(22, "img", 17),
                    b()()(),
                    S(23, "div", 11)(24, "div", 12)(25, "div", 13)(
                      26,
                      "div",
                      14
                    )(27, "div", 15),
                    Y(28, "T-SHIRT LOGO"),
                    b()()(),
                    S(29, "div", 16),
                    ee(30, "img", 18),
                    b()()()(),
                    ee(31, "hr", 19),
                    S(32, "div", 6)(33, "div", 11)(34, "div", 12)(
                      35,
                      "div",
                      13
                    )(36, "div", 14)(37, "div", 15),
                    Y(38, "G\xdcVEN HUKUK B\xdcROSU"),
                    b()()(),
                    S(39, "div", 16),
                    ee(40, "img", 20),
                    b()()(),
                    S(41, "div", 11)(42, "div", 12)(43, "div", 13)(
                      44,
                      "div",
                      14
                    )(45, "div", 15),
                    Y(46, "TESTERE FILM"),
                    b()()(),
                    S(47, "div", 16),
                    ee(48, "img", 21),
                    b()()()(),
                    ee(49, "hr", 19),
                    S(50, "div", 6)(51, "div", 11)(52, "div", 12)(
                      53,
                      "div",
                      13
                    )(54, "div", 14)(55, "div", 15),
                    Y(56, "MASKE FILM"),
                    b()()(),
                    S(57, "div", 16),
                    ee(58, "img", 22),
                    b()()(),
                    S(59, "div", 11)(60, "div", 12)(61, "div", 13)(
                      62,
                      "div",
                      14
                    )(63, "div", 15),
                    Y(64, "THE PIANIST FILM"),
                    b()()(),
                    S(65, "div", 16),
                    ee(66, "img", 23),
                    b()()()(),
                    ee(67, "hr", 19),
                    S(68, "div", 6)(69, "div", 11)(70, "div", 12)(
                      71,
                      "div",
                      13
                    )(72, "div", 14)(73, "div", 15),
                    Y(74, "INTERSTELLAR FILM"),
                    b()()(),
                    S(75, "div", 16),
                    ee(76, "img", 24),
                    b()()(),
                    S(77, "div", 11)(78, "div", 12)(79, "div", 13)(
                      80,
                      "div",
                      14
                    )(81, "div", 15),
                    Y(82, "DAMLA ESTETIK"),
                    b()()(),
                    S(83, "div", 16),
                    ee(84, "img", 25),
                    b()()()(),
                    ee(85, "hr", 19),
                    S(86, "div", 6)(87, "div", 11)(88, "div", 12)(
                      89,
                      "div",
                      13
                    )(90, "div", 14)(91, "div", 15),
                    Y(92, "G\xdcVEN GRUP LOGOLAR"),
                    b()()(),
                    S(93, "div", 16),
                    ee(94, "img", 26),
                    b()()(),
                    S(95, "div", 11)(96, "div", 12)(97, "div", 13)(
                      98,
                      "div",
                      14
                    )(99, "div", 15),
                    Y(100, "TRANSFORMERS FILM"),
                    b()()(),
                    S(101, "div", 16),
                    ee(102, "img", 27),
                    b()()()(),
                    ee(103, "hr", 19),
                    S(104, "div", 6)(105, "div", 11)(106, "div", 12)(
                      107,
                      "div",
                      13
                    )(108, "div", 14)(109, "div", 15),
                    Y(110, "ASYA DENTAL"),
                    b()()(),
                    S(111, "div", 16),
                    ee(112, "img", 28),
                    b()()(),
                    S(113, "div", 11)(114, "div", 12)(115, "div", 13)(
                      116,
                      "div",
                      14
                    )(117, "div", 15),
                    Y(118, "TORKSAN"),
                    b()()(),
                    S(119, "div", 16),
                    ee(120, "img", 29),
                    b()()()()()());
                },
                styles: [
                  '#mainCoantiner[_ngcontent-%COMP%]{background-image:url(https://1.bp.blogspot.com/-Fo3iRt97ZXY/XvSG4EMwi0I/AAAAAAAAVEo/mrApRTcVVRk1m-fX9K-ffNwRUXlHUocdwCLcBGAsYHQ/s1600/h.jpg);margin:0;border:0px;background-color:#181828;height:100%;width:100%;padding-bottom:50px;justify-content:center;align-items:center}.mystyleSec[_ngcontent-%COMP%]{background-image:url(http://thepatternlibrary.com/img/h.jpg)}.myline[_ngcontent-%COMP%]{border-style:none;border-top-style:dotted;width:5%;border-color:#fff;border-width:12px;margin:100px auto}.mystylethird[_ngcontent-%COMP%]{background-image:url(https://www.toptal.com/designers/subtlepatterns/patterns/binding_dark.png)}.card[_ngcontent-%COMP%]{border:none;border-radius:30px;background-color:#14edaa}.wow-bg[_ngcontent-%COMP%]{background-color:#141421;border:1px solid #2e2e4c;box-shadow:3px 9px 16px #0006,-3px -3px 10px #ffffff0f,inset 14px 14px 26px #0000004d,inset -3px -3px 15px #ffffff0d;border-radius:10px;margin-top:4px}.starsec[_ngcontent-%COMP%]{content:" ";position:absolute;width:3px;height:3px;background:transparent;box-shadow:571px 173px #00bcd4,1732px 143px #00bcd4,1745px 454px #ff5722,234px 784px #00bcd4,1793px 1123px #ff9800,1076px 504px #03a9f4,633px 601px #ff5722,350px 630px #ffeb3b,1164px 782px #00bcd4,76px 690px #3f51b5,1825px 701px #cddc39,1646px 578px #ffeb3b,544px 293px #2196f3,445px 1061px #673ab7,928px 47px #00bcd4,168px 1410px #8bc34a,777px 782px #9c27b0,1235px 1941px #9c27b0,104px 1690px #8bc34a,1167px 1338px #e91e63,345px 1652px #009688,1682px 1196px #f44336,1995px 494px #8bc34a,428px 798px #ff5722,340px 1623px #f44336,605px 349px #9c27b0,1339px 1344px #673ab7,1102px 1745px #3f51b5,1592px 1676px #2196f3,419px 1024px #ff9800,630px 1033px #4caf50,1995px 1644px #00bcd4,1092px 712px #9c27b0,1355px 606px #f44336,622px 1881px #cddc39,1481px 621px #9e9e9e,19px 1348px #8bc34a,864px 1780px #e91e63,442px 1136px #2196f3,67px 712px #ff5722,89px 1406px #f44336,275px 321px #009688,592px 630px #e91e63,1012px 1690px #9c27b0,1749px 23px #673ab7,94px 1542px #ffeb3b,1201px 1657px #3f51b5,1505px 692px #2196f3,1799px 601px #03a9f4,656px 811px #00bcd4,701px 597px #00bcd4,1202px 46px #ff5722,890px 569px #ff5722,1613px 813px #2196f3,223px 252px #ff9800,983px 1093px #f44336,726px 1029px #ffc107,1764px 778px #cddc39,622px 1643px #f44336,174px 1559px #673ab7,212px 517px #00bcd4,340px 505px #fff,1700px 39px #fff,1768px 516px #f44336,849px 391px #ff9800,228px 1824px #fff,1119px 1680px #ffc107,812px 1480px #3f51b5,1438px 1585px #cddc39,137px 1397px #fff,1080px 456px #673ab7,1208px 1437px #03a9f4,857px 281px #f44336,1254px 1306px #cddc39,987px 990px #4caf50,1655px 911px #00bcd4,1102px 1216px #ff5722,1807px 1044px #fff,660px 435px #03a9f4,299px 678px #4caf50,1193px 115px #ff9800,918px 290px #cddc39,1447px 1422px #ffeb3b,91px 1273px #9c27b0,108px 223px #ffeb3b,146px 754px #00bcd4,461px 1446px #ff5722,1004px 391px #673ab7,1529px 516px #f44336,1206px 845px #cddc39,347px 583px #009688,1102px 1332px #f44336,709px 1756px #00bcd4,1972px 248px #fff,1669px 1344px #ff5722,1132px 406px #f44336,320px 1076px #cddc39,126px 943px #ffeb3b,263px 604px #ff5722,1546px 692px #f44336;animation:_ngcontent-%COMP%_animStar 150s linear infinite}.starthird[_ngcontent-%COMP%]{content:" ";position:absolute;width:3px;height:3px;background:transparent;box-shadow:571px 173px #00bcd4,1732px 143px #00bcd4,1745px 454px #ff5722,234px 784px #00bcd4,1793px 1123px #ff9800,1076px 504px #03a9f4,633px 601px #ff5722,350px 630px #ffeb3b,1164px 782px #00bcd4,76px 690px #3f51b5,1825px 701px #cddc39,1646px 578px #ffeb3b,544px 293px #2196f3,445px 1061px #673ab7,928px 47px #00bcd4,168px 1410px #8bc34a,777px 782px #9c27b0,1235px 1941px #9c27b0,104px 1690px #8bc34a,1167px 1338px #e91e63,345px 1652px #009688,1682px 1196px #f44336,1995px 494px #8bc34a,428px 798px #ff5722,340px 1623px #f44336,605px 349px #9c27b0,1339px 1344px #673ab7,1102px 1745px #3f51b5,1592px 1676px #2196f3,419px 1024px #ff9800,630px 1033px #4caf50,1995px 1644px #00bcd4,1092px 712px #9c27b0,1355px 606px #f44336,622px 1881px #cddc39,1481px 621px #9e9e9e,19px 1348px #8bc34a,864px 1780px #e91e63,442px 1136px #2196f3,67px 712px #ff5722,89px 1406px #f44336,275px 321px #009688,592px 630px #e91e63,1012px 1690px #9c27b0,1749px 23px #673ab7,94px 1542px #ffeb3b,1201px 1657px #3f51b5,1505px 692px #2196f3,1799px 601px #03a9f4,656px 811px #00bcd4,701px 597px #00bcd4,1202px 46px #ff5722,890px 569px #ff5722,1613px 813px #2196f3,223px 252px #ff9800,983px 1093px #f44336,726px 1029px #ffc107,1764px 778px #cddc39,622px 1643px #f44336,174px 1559px #673ab7,212px 517px #00bcd4,340px 505px #fff,1700px 39px #fff,1768px 516px #f44336,849px 391px #ff9800,228px 1824px #fff,1119px 1680px #ffc107,812px 1480px #3f51b5,1438px 1585px #cddc39,137px 1397px #fff,1080px 456px #673ab7,1208px 1437px #03a9f4,857px 281px #f44336,1254px 1306px #cddc39,987px 990px #4caf50,1655px 911px #00bcd4,1102px 1216px #ff5722,1807px 1044px #fff,660px 435px #03a9f4,299px 678px #4caf50,1193px 115px #ff9800,918px 290px #cddc39,1447px 1422px #ffeb3b,91px 1273px #9c27b0,108px 223px #ffeb3b,146px 754px #00bcd4,461px 1446px #ff5722,1004px 391px #673ab7,1529px 516px #f44336,1206px 845px #cddc39,347px 583px #009688,1102px 1332px #f44336,709px 1756px #00bcd4,1972px 248px #fff,1669px 1344px #ff5722,1132px 406px #f44336,320px 1076px #cddc39,126px 943px #ffeb3b,263px 604px #ff5722,1546px 692px #f44336;animation:_ngcontent-%COMP%_animStar 10s linear infinite}.starfourth[_ngcontent-%COMP%]{content:" ";position:absolute;width:2px;height:2px;background:transparent;box-shadow:571px 173px #00bcd4,1732px 143px #00bcd4,1745px 454px #ff5722,234px 784px #00bcd4,1793px 1123px #ff9800,1076px 504px #03a9f4,633px 601px #ff5722,350px 630px #ffeb3b,1164px 782px #00bcd4,76px 690px #3f51b5,1825px 701px #cddc39,1646px 578px #ffeb3b,544px 293px #2196f3,445px 1061px #673ab7,928px 47px #00bcd4,168px 1410px #8bc34a,777px 782px #9c27b0,1235px 1941px #9c27b0,104px 1690px #8bc34a,1167px 1338px #e91e63,345px 1652px #009688,1682px 1196px #f44336,1995px 494px #8bc34a,428px 798px #ff5722,340px 1623px #f44336,605px 349px #9c27b0,1339px 1344px #673ab7,1102px 1745px #3f51b5,1592px 1676px #2196f3,419px 1024px #ff9800,630px 1033px #4caf50,1995px 1644px #00bcd4,1092px 712px #9c27b0,1355px 606px #f44336,622px 1881px #cddc39,1481px 621px #9e9e9e,19px 1348px #8bc34a,864px 1780px #e91e63,442px 1136px #2196f3,67px 712px #ff5722,89px 1406px #f44336,275px 321px #009688,592px 630px #e91e63,1012px 1690px #9c27b0,1749px 23px #673ab7,94px 1542px #ffeb3b,1201px 1657px #3f51b5,1505px 692px #2196f3,1799px 601px #03a9f4,656px 811px #00bcd4,701px 597px #00bcd4,1202px 46px #ff5722,890px 569px #ff5722,1613px 813px #2196f3,223px 252px #ff9800,983px 1093px #f44336,726px 1029px #ffc107,1764px 778px #cddc39,622px 1643px #f44336,174px 1559px #673ab7,212px 517px #00bcd4,340px 505px #fff,1700px 39px #fff,1768px 516px #f44336,849px 391px #ff9800,228px 1824px #fff,1119px 1680px #ffc107,812px 1480px #3f51b5,1438px 1585px #cddc39,137px 1397px #fff,1080px 456px #673ab7,1208px 1437px #03a9f4,857px 281px #f44336,1254px 1306px #cddc39,987px 990px #4caf50,1655px 911px #00bcd4,1102px 1216px #ff5722,1807px 1044px #fff,660px 435px #03a9f4,299px 678px #4caf50,1193px 115px #ff9800,918px 290px #cddc39,1447px 1422px #ffeb3b,91px 1273px #9c27b0,108px 223px #ffeb3b,146px 754px #00bcd4,461px 1446px #ff5722,1004px 391px #673ab7,1529px 516px #f44336,1206px 845px #cddc39,347px 583px #009688,1102px 1332px #f44336,709px 1756px #00bcd4,1972px 248px #fff,1669px 1344px #ff5722,1132px 406px #f44336,320px 1076px #cddc39,126px 943px #ffeb3b,263px 604px #ff5722,1546px 692px #f44336;animation:_ngcontent-%COMP%_animStar 50s linear infinite}.starfifth[_ngcontent-%COMP%]{content:" ";position:absolute;width:1px;height:1px;background:transparent;box-shadow:571px 173px #00bcd4,1732px 143px #00bcd4,1745px 454px #ff5722,234px 784px #00bcd4,1793px 1123px #ff9800,1076px 504px #03a9f4,633px 601px #ff5722,350px 630px #ffeb3b,1164px 782px #00bcd4,76px 690px #3f51b5,1825px 701px #cddc39,1646px 578px #ffeb3b,544px 293px #2196f3,445px 1061px #673ab7,928px 47px #00bcd4,168px 1410px #8bc34a,777px 782px #9c27b0,1235px 1941px #9c27b0,104px 1690px #8bc34a,1167px 1338px #e91e63,345px 1652px #009688,1682px 1196px #f44336,1995px 494px #8bc34a,428px 798px #ff5722,340px 1623px #f44336,605px 349px #9c27b0,1339px 1344px #673ab7,1102px 1745px #3f51b5,1592px 1676px #2196f3,419px 1024px #ff9800,630px 1033px #4caf50,1995px 1644px #00bcd4,1092px 712px #9c27b0,1355px 606px #f44336,622px 1881px #cddc39,1481px 621px #9e9e9e,19px 1348px #8bc34a,864px 1780px #e91e63,442px 1136px #2196f3,67px 712px #ff5722,89px 1406px #f44336,275px 321px #009688,592px 630px #e91e63,1012px 1690px #9c27b0,1749px 23px #673ab7,94px 1542px #ffeb3b,1201px 1657px #3f51b5,1505px 692px #2196f3,1799px 601px #03a9f4,656px 811px #00bcd4,701px 597px #00bcd4,1202px 46px #ff5722,890px 569px #ff5722,1613px 813px #2196f3,223px 252px #ff9800,983px 1093px #f44336,726px 1029px #ffc107,1764px 778px #cddc39,622px 1643px #f44336,174px 1559px #673ab7,212px 517px #00bcd4,340px 505px #fff,1700px 39px #fff,1768px 516px #f44336,849px 391px #ff9800,228px 1824px #fff,1119px 1680px #ffc107,812px 1480px #3f51b5,1438px 1585px #cddc39,137px 1397px #fff,1080px 456px #673ab7,1208px 1437px #03a9f4,857px 281px #f44336,1254px 1306px #cddc39,987px 990px #4caf50,1655px 911px #00bcd4,1102px 1216px #ff5722,1807px 1044px #fff,660px 435px #03a9f4,299px 678px #4caf50,1193px 115px #ff9800,918px 290px #cddc39,1447px 1422px #ffeb3b,91px 1273px #9c27b0,108px 223px #ffeb3b,146px 754px #00bcd4,461px 1446px #ff5722,1004px 391px #673ab7,1529px 516px #f44336,1206px 845px #cddc39,347px 583px #009688,1102px 1332px #f44336,709px 1756px #00bcd4,1972px 248px #fff,1669px 1344px #ff5722,1132px 406px #f44336,320px 1076px #cddc39,126px 943px #ffeb3b,263px 604px #ff5722,1546px 692px #f44336;animation:_ngcontent-%COMP%_animStar 80s linear infinite}@keyframes _ngcontent-%COMP%_animStar{0%{transform:translateY(0)}to{transform:translateY(-2000px)}}.logn-btn[_ngcontent-%COMP%]{background:#1c1f2f;border-radius:30px;overflow:hidden;border:1px solid #2e344d;transition:all .3s ease-in-out 0s;box-shadow:0 2px 26px #00000080,0 7px 13px #ffffff08;margin-top:30px}.logn-btn[_ngcontent-%COMP%]:hover{background-color:#1c1f2f;border-radius:50px;min-width:140px;box-shadow:3px 9px 16px #0006,-3px -3px 10px #ffffff0f,inset 14px 14px 26px #0000004d,inset -3px -3px 15px #ffffff0d;border-width:1px 0px 0px 1px;border-style:solid;border-color:#2e344d}.textbox-dg[_ngcontent-%COMP%]{background:rgba(28,31,47,.16);border-radius:4px;overflow:hidden;border:1px solid #2e344d;transition:all .3s ease-in-out 0s;box-shadow:10px 10px 36px #00000080,-13px -13px 23px #ffffff08;border-width:1px 0px 0 1px;margin-top:15px}.form-control[_ngcontent-%COMP%]:focus{border:1px solid #344d2e;color:#495057;outline:0;background:rgb(17,20,31);border-radius:4px;transition:all .3s ease-in-out 0s;box-shadow:10px 10px 36px #00000080,-13px -13px 23px #ffffff08}.btn-link[_ngcontent-%COMP%]{color:#344d2e}.btn-link[_ngcontent-%COMP%]:hover{color:#2b7a19;text-decoration:underline}.btn-primary[_ngcontent-%COMP%]:not(:disabled):not(.disabled).active, .btn-primary[_ngcontent-%COMP%]:not(:disabled):not(.disabled):active, .show[_ngcontent-%COMP%] > .btn-primary.dropdown-toggle[_ngcontent-%COMP%]{color:#807f7f;background-color:transparent;border-color:#2b7a19}.btn-primary.focus[_ngcontent-%COMP%], .btn-primary[_ngcontent-%COMP%]:focus{color:#fff;background-color:transparent;border-color:transparent;box-shadow:0 0 0 .2rem #00ff6e40}.mt-6[_ngcontent-%COMP%], .my-6[_ngcontent-%COMP%]{margin-top:2rem!important}.socila-btn[_ngcontent-%COMP%]{height:40px;border-radius:10%;width:40px;box-shadow:3px 9px 16px #0006,-3px -3px 10px #ffffff0f,inset 14px 14px 26px #0000004d,inset -3px -3px 15px #ffffff0d;border-width:1px 0px 0px 1px;border-style:solid;border-color:#fff3;margin-right:10px}.fb-color[_ngcontent-%COMP%]{color:#3b5998}.incolor[_ngcontent-%COMP%]{color:#007bff}.tweetcolor[_ngcontent-%COMP%]{color:#41a4f7}.driblecolor[_ngcontent-%COMP%]{color:#e83e8c}.colorboard[_ngcontent-%COMP%]{color:#00ffaaed}.title-h1[_ngcontent-%COMP%]{margin-top:.5em;margin-bottom:1.4em;letter-spacing:.05em;text-transform:uppercase;line-height:inherit;color:#fff;font-size:38px}.title-h1[_ngcontent-%COMP%]   .light[_ngcontent-%COMP%]{font-weight:400}.pricing-price-wrapper[_ngcontent-%COMP%]{background-color:#47474833;border-top-right-radius:50%;border-top-left-radius:50%;padding-top:45px;padding-bottom:34px;text-align:center;box-shadow:20px 20px 60px #00000021,-20px -20px 60px #1d1d1d14}.pricing-price[_ngcontent-%COMP%]{background-color:#393b4a;background-color:#00bcd4;box-shadow:0 0 0 10px #00bcd44f;color:#fff;border-radius:50%;height:180px;width:180px;display:inline-block;padding-top:46px}.pricing-cost[_ngcontent-%COMP%]{font-size:50px;font-weight:300;line-height:1}.pricing-table-style-4[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]{font-size:24px;font-weight:300}.pricing-row-title[_ngcontent-%COMP%]{background-color:#303241;padding:26px 10px;text-align:center}.pricing_row_title[_ngcontent-%COMP%]{color:#00bcd4;line-height:38px;font-size:24px;font-weight:700;text-transform:uppercase}.pricing-table.pricing-table-style-4[_ngcontent-%COMP%]   .pricing-row[_ngcontent-%COMP%]{background-color:#393b4a}.pricing-table-style-4[_ngcontent-%COMP%]   figure.pricing-row[_ngcontent-%COMP%]:first-of-type{padding-top:15px}.pricing-table-style-4[_ngcontent-%COMP%]   .pricing-row[_ngcontent-%COMP%]{padding:5px 10px}figure[_ngcontent-%COMP%]{margin:0;display:block}figure[_ngcontent-%COMP%]{display:block;padding-block-start:.4em;padding-block-end:.4em;padding-inline-start:40px;padding-inline-end:40px;background-color:#33333369;text-align:left}.pricing-row[_ngcontent-%COMP%]:before{vertical-align:middle;content:"\\f058";font-family:"Font Awesome 5 Free";color:#00bfa5;text-align:center;padding-right:10px}.strike[_ngcontent-%COMP%]:before{content:none}.pricing_row_title[_ngcontent-%COMP%]{color:#00bcd4}.pricing-column[_ngcontent-%COMP%]{float:none;display:inline-block;text-align:left;vertical-align:top;margin-bottom:42px;transition:all .3s ease-in-out 0s}.pricing-column-wrapper[_ngcontent-%COMP%]{min-width:271px;text-align:center}.pricing-row-title[_ngcontent-%COMP%]{background-color:#30324133}.margin-body[_ngcontent-%COMP%]{position:flex;width:100%;box-sizing:border-box;justify-content:center}.pricing-row[_ngcontent-%COMP%]{border-top:1px solid #7273723b}.pricing-price-wrapper[_ngcontent-%COMP%]{border-top-right-radius:50%;border-top-left-radius:50%;padding-top:45px}.pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%]   .pricing-price[_ngcontent-%COMP%]{background-color:#a637ec;box-shadow:0 0 0 10px #a637ec4f}.strike[_ngcontent-%COMP%]{text-decoration:line-through;color:#99a9b5}.pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%]   .pricing_row_title[_ngcontent-%COMP%]{color:#a637ec}.pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%]   .pricing_row_title[_ngcontent-%COMP%]{color:#ee417c}.pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%]   .pricing-price[_ngcontent-%COMP%]{background-color:#ee417c;box-shadow:0 0 0 10px #ee417c4f}.pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%]   .pricing_row_title[_ngcontent-%COMP%]{color:#ff994e}.pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%]   .pricing-price[_ngcontent-%COMP%]{background-color:#ff994e;box-shadow:0 0 0 10px #ff994e4f}.pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%]   .pricing-row[_ngcontent-%COMP%]:before{color:#a637ec}.pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%]   .pricing-row[_ngcontent-%COMP%]:before{color:#ee417c}.pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%]   .pricing-row[_ngcontent-%COMP%]:before{color:#ff994e}.gem-button[_ngcontent-%COMP%]{cursor:pointer;border-width:2px;line-height:36px;border-style:solid;background:transparent;height:40px;line-height:40px;padding:0 17px;font-size:14px;margin:25px;position:relative;display:inline-block;text-align:center;text-transform:uppercase;white-space:nowrap;vertical-align:middle}.gem-green[_ngcontent-%COMP%]{border-radius:0;border-color:#00bcd4;color:#00bcd4!important}.gem-green[_ngcontent-%COMP%]:hover{background-color:#00bcd4;color:#fff!important}.gem-purpel[_ngcontent-%COMP%]{border-radius:0;border-color:#a637ec;color:#a637ec!important}.gem-purpel[_ngcontent-%COMP%]:hover{background-color:#a637ec;color:#fff!important}.gem-orange[_ngcontent-%COMP%]{border-radius:0;border-color:#ee417c;color:#ee417c!important}.gem-orange[_ngcontent-%COMP%]:hover{background-color:#ee417c;color:#fff!important}.gem-yellow[_ngcontent-%COMP%]{border-radius:0;border-color:#ff994e;color:#ff994e!important}.gem-yellow[_ngcontent-%COMP%]:hover{background-color:#ff994e;color:#fff!important}.gem-button-position-center[_ngcontent-%COMP%]{text-align:center;display:block;background-color:#0000002b;border-radius:0 0 10px 10px}.pricing-column[_ngcontent-%COMP%]:hover   .pricing-price-wrapper[_ngcontent-%COMP%]{box-shadow:0 35px 80px #04ffec40,0 0 #0ac5ad54;transition:all .3s ease-in-out 0s}.pricing-column[_ngcontent-%COMP%]:hover{overflow:hidden}.pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%]   .pricing-column[_ngcontent-%COMP%]:hover   .pricing-price-wrapper[_ngcontent-%COMP%]{box-shadow:0 35px 80px #e602f157,0 0 #151514c9;transition:all .3s ease-in-out 0s}.pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%]   .pricing-column[_ngcontent-%COMP%]:hover   .pricing-price-wrapper[_ngcontent-%COMP%]{box-shadow:0 35px 80px #ff04a640,0 0 #de065454;transition:all .3s ease-in-out 0s}.pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%] + .pricing-column-wrapper[_ngcontent-%COMP%]   .pricing-column[_ngcontent-%COMP%]:hover   .pricing-price-wrapper[_ngcontent-%COMP%]{box-shadow:0 35px 80px #f18b0257,0 0 #151514c9;transition:all .3s ease-in-out 0s}',
                ],
              }));
            }
            return e;
          })(),
        },
        {
          path: "cv",
          component: (() => {
            class e {
              static #e = (this.ɵfac = function (r) {
                return new (r || e)();
              });
              static #t = (this.ɵcmp = Mt({
                type: e,
                selectors: [["app-cv"]],
                decls: 1,
                vars: 0,
                consts: [
                  [
                    "assets/neslihancv.pdf",
                    "width",
                    "100%",
                    "height",
                    "1000px",
                    1,
                    "cvframe",
                  ],
                ],
                template: function (r, o) {
                  1 & r && ee(0, "iframe", 0);
                },
              }));
            }
            return e;
          })(),
        },
        {
          path: "courses",
          component: (() => {
            class e {
              static #e = (this.ɵfac = function (r) {
                return new (r || e)();
              });
              static #t = (this.ɵcmp = Mt({
                type: e,
                selectors: [["app-courses"]],
                decls: 4,
                vars: 0,
                consts: [
                  [1, "container"],
                  [
                    "id",
                    "cvframe",
                    "assets/certificate.pdf",
                    "width",
                    "100%",
                    "height",
                    "1000px",
                    1,
                    "cvframe",
                  ],
                ],
                template: function (r, o) {
                  1 & r &&
                    (S(0, "div", 0)(1, "h1"),
                    Y(2, "Kurslar\u0131m"),
                    b(),
                    ee(3, "iframe", 1),
                    b());
                },
                styles: [
                  ".container[_ngcontent-%COMP%]{background-color:#ffffff1a;min-width:100%}",
                ],
              }));
            }
            return e;
          })(),
        },
        {
          path: "references",
          component: (() => {
            class e {
              static #e = (this.ɵfac = function (r) {
                return new (r || e)();
              });
              static #t = (this.ɵcmp = Mt({
                type: e,
                selectors: [["app-reference"]],
                decls: 4,
                vars: 0,
                consts: [
                  [1, "container"],
                  [
                    "id",
                    "cvframe",
                    "assets/Referans Mektubu_.pdf",
                    "width",
                    "100%",
                    "height",
                    "1000px",
                    1,
                    "cvframe",
                  ],
                ],
                template: function (r, o) {
                  1 & r &&
                    (S(0, "div", 0)(1, "h1"),
                    Y(2, "Referanslar\u0131m"),
                    b(),
                    ee(3, "iframe", 1),
                    b());
                },
                styles: [
                  ".container[_ngcontent-%COMP%]{background-color:#ffffff1a;min-width:100%}",
                ],
              }));
            }
            return e;
          })(),
        },
        { path: "**", component: h0 },
      ];
      let rP = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = xn({ type: e }));
            static #n = (this.ɵinj = an({ imports: [f0.forRoot(nP), f0] }));
          }
          return e;
        })(),
        oP = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = Mt({
              type: e,
              selectors: [["app-navigation"]],
              decls: 23,
              vars: 0,
              consts: [
                [1, "container"],
                [1, "navbar", "navbar-expand-lg", "navbar-dark"],
                ["routerLink", "/", 1, "navbar-brand"],
                [
                  "assets/neslihan-cropped.png",
                  "width",
                  "50px",
                  "height",
                  "50px",
                ],
                [
                  "type",
                  "button",
                  "data-toggle",
                  "collapse",
                  "data-target",
                  "#navbarSupportedContent",
                  "aria-controls",
                  "navbarSupportedContent",
                  "aria-expanded",
                  "false",
                  "aria-label",
                  "Toggle navigation",
                  1,
                  "navbar-toggler",
                ],
                [1, "navbar-toggler-icon"],
                [
                  "id",
                  "navbarSupportedContent",
                  1,
                  "collapse",
                  "navbar-collapse",
                ],
                [1, "navbar-nav", "ml-auto"],
                [1, "nav-item"],
                ["routerLink", "/", 1, "nav-link"],
                ["routerLink", "/projects", 1, "nav-link"],
                ["routerLink", "/courses", 1, "nav-link"],
                ["routerLink", "/cv", 1, "nav-link"],
                ["routerLink", "/references", 1, "nav-link"],
              ],
              template: function (r, o) {
                1 & r &&
                  (S(0, "div", 0)(1, "nav", 1)(2, "a", 2),
                  ee(3, "img", 3),
                  b(),
                  S(4, "button", 4),
                  ee(5, "span", 5),
                  b(),
                  S(6, "div", 6)(7, "ul", 7)(8, "li", 8)(9, "a", 9),
                  Y(10, "Ana Sayfa"),
                  b()(),
                  S(11, "li", 8)(12, "a", 10),
                  Y(13, "Tasar\u0131mlar\u0131m"),
                  b()(),
                  S(14, "li", 8)(15, "a", 11),
                  Y(16, "Kurslar\u0131m"),
                  b()(),
                  S(17, "li", 8)(18, "a", 12),
                  Y(19, "CV"),
                  b()(),
                  S(20, "li", 8)(21, "a", 13),
                  Y(22, "Referanslar\u0131m"),
                  b()()()()()());
              },
              dependencies: [Ks],
              styles: [
                ".container[_ngcontent-%COMP%]{align-items:center;text-align:center;min-width:100%;display:flex;justify-content:center}.navbar[_ngcontent-%COMP%]{display:flex;font-size:1.5rem;font-family:Franklin Gothic Medium,Arial Narrow,Arial,sans-serif;text-align:center;justify-content:space-between}.nav-item[_ngcontent-%COMP%]{margin-left:7rem}.nav-link[_ngcontent-%COMP%]{font-size:1.5rem}.reference-navbar[_ngcontent-%COMP%]{font-size:1.5rem;font-family:Franklin Gothic Medium,Arial Narrow,Arial,sans-serif;background-color:#303241;padding:0}#navlist[_ngcontent-%COMP%]{flex-direction:column;display:none}#toggle-nav[_ngcontent-%COMP%]{display:block;color:#fff;margin-right:3%;padding-right:3%}a[_ngcontent-%COMP%]{color:#45b29a;font-family:Franklin Gothic Medium,Arial Narrow,Arial,sans-serif;margin:10px 40px;text-decoration:none;font-size:1.4rem;font-weight:400}a[_ngcontent-%COMP%]:hover{color:#eaf6f6}",
              ],
            }));
          }
          return e;
        })(),
        iP = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = Mt({
              type: e,
              selectors: [["app-footer"]],
              decls: 9,
              vars: 0,
              consts: [
                [1, "bottom-container"],
                [
                  "href",
                  "https://www.linkedin.com/in/neslihan-y%C4%B1lmaz-986845294/",
                  1,
                  "footer-link",
                ],
                ["href", "https://github.com/Neslihan1989", 1, "footer-link"],
                [
                  "href",
                  "https://www.instagram.com/neslihan.tasarim/",
                  1,
                  "footer-link",
                ],
                [1, "footer-copy"],
              ],
              template: function (r, o) {
                1 & r &&
                  (S(0, "div", 0)(1, "a", 1),
                  Y(2, "LinkedIn"),
                  b(),
                  S(3, "a", 2),
                  Y(4, "Github"),
                  b(),
                  S(5, "a", 3),
                  Y(6, "Instagram"),
                  b(),
                  S(7, "p", 4),
                  Y(8, "\xa9 2023 Neslihan Y\u0131lmaz."),
                  b()());
              },
              styles: [
                ".bottom-container[_ngcontent-%COMP%]{color:#66bfbf;background-color:#ffffff1a;padding:1rem 0;display:block;text-align:center;align-items:center;font-family:Franklin Gothic Medium,Arial Narrow,Arial,sans-serif}",
              ],
            }));
          }
          return e;
        })(),
        sP = (() => {
          class e {
            constructor() {
              this.title = "NeslihanPortfolio";
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = Mt({
              type: e,
              selectors: [["app-root"]],
              decls: 4,
              vars: 0,
              consts: [[1, "container"]],
              template: function (r, o) {
                1 & r &&
                  (S(0, "div", 0),
                  ee(1, "app-navigation")(2, "router-outlet")(3, "app-footer"),
                  b());
              },
              dependencies: [Tl, oP, iP],
              styles: [
                ".container[_ngcontent-%COMP%]{margin:0;padding:0;text-align:center;font-family:Franklin Gothic Medium,Arial Narrow,Arial,sans-serif;color:#fff;background-color:#303241;min-width:100%}",
              ],
            }));
          }
          return e;
        })(),
        aP = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = xn({ type: e, bootstrap: [sP] }));
            static #n = (this.ɵinj = an({ imports: [dT, rP] }));
          }
          return e;
        })();
      lT()
        .bootstrapModule(aP)
        .catch((e) => console.error(e));
    },
  },
  (ne) => {
    ne((ne.s = 602));
  },
]);
