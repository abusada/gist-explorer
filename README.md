
Deployed on: [gist-explorer.vercel.app](https://gist-explorer.vercel.app)

This is an assignement for a frontend interview - [see details here](Frontend%20Assignment%20Test.pdf)

## Design & UX

1. I used [Material UI](https://material-ui.com/)
2. The whole app works in one page, i first wanted to to multiple pages, but then i realsied it would be an overkill, the data we are displaying is simple & small, and it makes sense for the user to see all his exploration in one page, think of it as the `Lists` view option in MacOS Finder.
3. Columns start sliding in as you choose your data which directs user attention to the next section they should be looking at.

### Search
1. Once the page is loaded, Search field is auto focused, the user can start typing immedietly
2. Results are displayed in a list below the search field, each list item can be selected
3. If the user has recent searched they will be displayed under the search field
4. Selecting a recent item will set it as the value in the search field and trigger a search

## Gists List
1. Appears as the second column, displays the user's gists in a list
2. For each gist, the user can see 
  a) Gist's name (uses first filename, inspired from [github's UI](https://gist.github.com/abusada))
  b) Gist's description
  c) Gist's programming langauges

## Gist Details
1. has two sections (tabs)
 a) Gist files, displays files with syntax highlighting, User can click on a file to see it's full code in a fullscreen. 
 b) Forks, displays a list of users who forked this gist. 
 

## Techincal Decisions

### Recents
1. Recents are saved in localStorage as an array, ideally they would be saved in a database but for the scope of this project this would be an overkill.
2. Implemented a simple api to be able to manipulate recents -- See [useRecents](https://github.com/abusada/gist-explorer/blob/main/hooks/useRecents.js) hook.
3. I used [use-persisted-state](https://github.com/donavon/use-persisted-state/) to access localStorage.
4. Since the data is displayed in an array, and every new item is pushed to it, `reversing` the array order when displaying it guarantees that the most recent items are displayed to the top

### Forks

The assignment wanted me to use `forks` api, means that I would have ideally used this api `https://developer.github.com/v3/gists/#list-gist-forks` but while exploring the docs i noticed that [getting a gist](https://developer.github.com/v3/gists/#get-a-gist) would also include forks, so I thought that I want to make my app more useful and display gist files in addition to forks.

### Filetype

Each item in `gist.files` response has a `language` propery, it means that github have already done this for me, so no need for me to infer language from the file name.


## Tests
1. Uses jest
2. please check __tests__ folder
3. I didn't write so many tests, only 2 functions.
4. for UI unit testing i would usually use snapshots, but for the scope of this project and considering that it is not a real world product that will be used by users, i didn't invest much time in testing.


## Libraries Uses:

1. [Nextjs](https://github.com/zeit/next.js/): 
2. [Material UI](https://material-ui.com/)
3. [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
4. [swr](https://swr.vercel.app/)
5. [use-persisted-state](https://github.com/donavon/use-persisted-state/)

## Todo Improvements

- [ ] Handle Errors & Github Rate Limit
- [ ] More visually appealing `Loading...` components
- [ ] Save query (searc, userId, gistId) in url, so that the page becomes shareable, and also when the user refreshes the page, data would persist.
- [ ] On mobile - when the user selects a user, scroll to gists list
- [ ] On mobile - when the user selects a gist, scroll to gist details



