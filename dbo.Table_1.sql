CREATE TABLE [dbo].[Ratings]
(
	[Useraccount] char(100) NOT NULL,
	[Username] char(100) NULL DEFAULT NULL,
	CONSTRAINT [Username] PRIMARY KEY CLUSTERED ([Useraccount] ASC),
	[rating] INT NULL,
	[comment] text

)
