# Test info

- Name: Footer is visible and has expected content
- Location: /Users/andrewjohnson/InternshipNextPlayNation/client/tests/footer.spec.ts:9:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('.custom-footer-container')
Expected string: "©"
Received string: "Download our AppAdmin Login"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('.custom-footer-container')
    9 × locator resolved to <div class=" w-screen overflow-hidden relative bottom-0 bg-gray-400 h-[210px] custom-footer-container">…</div>
      - unexpected value "Download our AppAdmin Login"

    at /Users/andrewjohnson/InternshipNextPlayNation/client/tests/footer.spec.ts:16:24
```

# Page snapshot

```yaml
- link "Logo":
  - /url: /
  - img "Logo"
- text: Programs & Sports Event & Workshops Get Involved Resources For Athletes Media & News Contact
- img "Next Play Nation Logo"
- heading "Our Sponsors" [level=3]
- heading "MISSION STATEMENT" [level=3]
- paragraph: Next Play Nation is a nonprofit dedicated to athlete development, life skills, and community empowerment. We bridge the gap between youth sports and long-term opportunity by offering leagues, training, mentorship, and educational resources to help athletes succeed on and off the field.
- heading "FEATURES, EVENTS, & NEWS" [level=3]
- paragraph: Stay updated with our latest camps, league announcements, player highlights, and community news. From special guest appearances to athlete signings, this is your hub for all things Next Play Nation.
- heading "Call to Action" [level=3]
- paragraph: Join the movement. Whether you're a player, coach, parent, or supporter — there’s a place for you at Next Play Nation. [Volunteer, Donate, Register, or Sponsor Today]
- heading "Who We Are" [level=3]
- paragraph: Next Play Nation was founded to give athletes a second chance, a new opportunity, and a support system. Our mission is to empower youth through sports, mentorship, and leadership training, helping them prepare for what’s next — in the game and in life.
- heading "Leadership & Coaching Staff" [level=3]
- paragraph: Our team includes former athletes, certified trainers, and passionate community leaders. With NFL-level coaching and nonprofit leadership, our staff is committed to athlete growth, safety, and success at every level.
- heading "Athlete Success Stories" [level=3]
- paragraph: From local standouts to collegiate and international signings, Next Play Nation athletes are making waves. Read inspiring stories of players who’ve used our programs as a springboard to scholarships and professional opportunities.
- heading "Community Impact" [level=3]
- paragraph: Through camps, outreach events, and educational initiatives, we've served hundreds of families across Texas. Our programs provide resources, mentorship, and access to underserved communities.
- heading "SUPPORT NEXT PLAY NATION – MAKE A DONATION TODAY" [level=3]
- link "Give Today Grow Tomorrow":
  - /url: /donate
  - text: Give Today Grow Tomorrow
  - button
- text: Download our App
- link:
  - /url: https://apps.apple.com/us/app/teamsideline/id1232007355
- link:
  - /url: https://play.google.com/store/apps/details?id=com.teamsideline.teamsites&hl=en
- link:
  - /url: https://www.linkedin.com/in/jerrit-a-judie-141b32174/
- link:
  - /url: https://www.instagram.com/tnpn25_/
- link:
  - /url: https://www.facebook.com/people/The-Next-Play-Basketball-League/61573644021377/
- link "Admin Login":
  - /url: /admin
  - heading "Admin Login" [level=3]
```

# Test source

```ts
   1 |
   2 |
   3 |
   4 |
   5 |
   6 | // client/tests/footer.spec.ts
   7 | import { test, expect } from '@playwright/test';
   8 |
   9 | test('Footer is visible and has expected content', async ({ page }) => {
  10 |   await page.goto('https://nextplayinternshipclient.onrender.com');
  11 |
  12 |   const footer = page.locator('.custom-footer-container');
  13 |   await expect(footer).toBeVisible();
  14 |
  15 |   // Example: Check if footer contains text
> 16 |   await expect(footer).toContainText('©'); // or specific footer text like '© 2025 Next Play Nation'
     |                        ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
  17 | });
```