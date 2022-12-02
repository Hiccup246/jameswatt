# James Watt Portfolio
![](site-design.png)

## ToDo
- Remove redundant global CSS
- Complete Books section
- Complete Credits section
  - Consider some different designs
- Complete footer
- Complete Technologies section
  - Complete draft design in figma
  - If draft design looks good then implement otherwise hold off and do credits
  - Consider not having a technologies section
- Mess around with different fonts
- Ensure website works fine on mobile
- Decide on a dark mode theme and implement it
- Complete Landing section
  - Understand how the wave and drop code works
  - Potentially add code for x offset so I can postion drop impact
  - Document how the wave and drop code works in a blog
  - Create SVG "Human Developer" text in Gimp
  - Decide what I want the main image to look like
  - Inspiration for custom images include
    - https://www.youtube.com/watch?v=v0hhwAMLnzU&ab_channel=DaviesMediaDesign
- Update all styles to be mobile first then apply larger styles at bigger breakpoints as per tailwind docs. Make sure to read tailwind docs on responsive design first as this site is desktop first.
- Clean up raw CSS files
- Check all semi colon usgae
- Check all single quote usage
- No hanging commas
- Update linter with stricter rules so evrything can be formatted nicley. Emphasis on styling long class names
- Consider overall site theme perhaps in relation to eventual landing section colors
- SEO Optimisation https://nystudio107.com/blog/modern-seo-snake-oil-vs-substance
- Think about tooltip implementation and perhaps use or base
custom solution off https://floating-ui.com/
- Review all next image "sizes" attributes
- Consider animating theme toggle to be link link where it slides into the text then out of it
- Consider changing project showcase so that projects move upward a bit like the about me section. Perhaps box shadow like
the "Visit the Expo" section https://bulma.io/
- Use title attribute for automatic tool tips
### Work Experience Section
- Clean up tab selection javascript
- Clean up and carefully check tailwind css classes
- Think about possible alternative component splits
- Refactor click logic
  - When you click on a side menu item you know where
  the slider highlight should be
  - When you click on a side menu item you know which  index is activated thus you know which panel should be displayed

### Bookshelf Section
- Refactor react code
- Consider alternative component splits

### Landing Section
- Center main image
- Make main image have different sizes for smaller devices
- Ensure white water tank is always visible on all scren sizes
- Search for text font with black outline
  - If none available use webps or attempt an SVG
- Compress main image, crop it too and give it high priority
- Make animation start after image has loaded in