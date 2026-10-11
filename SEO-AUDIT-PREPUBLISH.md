# SEO Audit Report: limpad.id (Pre-Publish)

**Date**: 11 Oktober 2026  
**Audited By**: SEO Audit Agent  
**Scope**: Build statis baru (`limpad-site/`) — 5+ halaman  
**Pages Checked**: index, services, about, contact, faq, servis-komputer-semarang

## Executive Summary

Build baru sudah kuat di on-page dasar: title unik, meta description, 1 H1 per halaman, alt text, viewport, canonical, LocalBusiness + FAQPage + Organization + Service schema.

**Critical fixed**: robots.txt + sitemap.xml ditambahkan. Halaman lokal SEO `servis-komputer-semarang` menarget keyword B2C lokal.

**Hosting note**: Canonical memakai URL bersih (`/services`) — wajib rewrite di hosting.

## Critical Issues
1. Canonical clean URL vs file .html — perlu rewrite/redirect di hosting
2. Deploy build baru ke production (live masih versi lama)

## High Priority
1. og:image — sudah dipatch di semua halaman
2. Schema — LocalBusiness, Organization, ItemList, ContactPage, FAQPage, Service
3. GBP + review untuk ranking "terdekat"

## Quick Wins
1. Upload robots.txt + sitemap.xml (done in repo)
2. Submit GSC sitemap setelah deploy
3. HTTPS + preferred host
4. NAP konsisten

## Pre-Publish Checklist
- [x] Title unik
- [x] Meta description unik
- [x] Single H1
- [x] Alt text
- [x] Canonical
- [x] Viewport
- [x] Schema LocalBusiness / FAQ / Organization / Service
- [x] robots.txt
- [x] sitemap.xml
- [x] Landing lokal keyword
- [ ] Pretty URL rewrite di hosting
- [ ] Submit GSC

Overall pre-publish: ~8.0 / 10 setelah deploy + rewrite.
